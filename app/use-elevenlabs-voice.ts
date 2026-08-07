"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const ADAM_VOICE_ID = "zKTOd8cxZlIf5EKC5Giv";
export const HOPE_VOICE_ID = "uYXf8XasLslADfZ2MB4u";

export const BAYBIMAI_VOICES = [
  { id: ADAM_VOICE_ID, name: "Adam · Conversational" },
  { id: HOPE_VOICE_ID, name: "Hope · Bubbly, Gossipy and Girly" },
] as const;

export type ElevenLabsVoiceId = (typeof BAYBIMAI_VOICES)[number]["id"];
export type ElevenLabsSpeechState = "idle" | "loading" | "playing" | "paused";

type SpeakOptions = {
  rate?: number;
  onEnded?: () => void;
  onError?: () => void;
};

const MAX_CHUNK_LENGTH = 9_000;
const VOICE_STORAGE_KEY = "baybimai-elevenlabs-voice";

export function isBAYBIMAIVoice(value: string): value is ElevenLabsVoiceId {
  return BAYBIMAI_VOICES.some((voice) => voice.id === value);
}

export function splitSpeechText(text: string) {
  const normalized = text.replace(/\r/g, "").trim();
  if (normalized.length <= MAX_CHUNK_LENGTH) return normalized ? [normalized] : [];

  const paragraphs = normalized.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  const pushPart = (part: string) => {
    if (!current) {
      current = part;
    } else if (current.length + part.length + 2 <= MAX_CHUNK_LENGTH) {
      current += `\n\n${part}`;
    } else {
      chunks.push(current);
      current = part;
    }
  };

  for (const paragraph of paragraphs) {
    if (paragraph.length <= MAX_CHUNK_LENGTH) {
      pushPart(paragraph);
      continue;
    }

    const sentences = paragraph.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) ?? [paragraph];
    for (const sentence of sentences) {
      if (sentence.length <= MAX_CHUNK_LENGTH) {
        pushPart(sentence.trim());
      } else {
        for (let index = 0; index < sentence.length; index += MAX_CHUNK_LENGTH) {
          pushPart(sentence.slice(index, index + MAX_CHUNK_LENGTH));
        }
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

export function useVoicePreference() {
  const [voiceId, setVoiceId] = useState<ElevenLabsVoiceId>(ADAM_VOICE_ID);

  useEffect(() => {
    const saved = window.localStorage.getItem(VOICE_STORAGE_KEY);
    if (saved && isBAYBIMAIVoice(saved)) {
      // One-time sync from localStorage after mount: state must start as
      // ADAM_VOICE_ID to match the server-rendered markup, so the saved
      // preference can only be applied once we're safely past hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVoiceId(saved);
    }
  }, []);

  const chooseVoice = useCallback((nextVoiceId: ElevenLabsVoiceId) => {
    setVoiceId(nextVoiceId);
    window.localStorage.setItem(VOICE_STORAGE_KEY, nextVoiceId);
  }, []);

  return { voiceId, chooseVoice };
}

// How often the playback-position poll updates charIndex. ElevenLabs gives us
// no word-level timestamps, so this is an approximation from
// audio.currentTime/audio.duration — a full requestAnimationFrame loop would
// just churn re-renders for precision nothing downstream can use.
const PROGRESS_POLL_MS = 90;

export function useElevenLabsVoice() {
  const [state, setState] = useState<ElevenLabsSpeechState>("idle");
  const [charIndex, setCharIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const generationRef = useRef(0);
  const rateRef = useRef(1);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunksRef = useRef<string[]>([]);
  const chunkOffsetsRef = useRef<number[]>([]);
  const chunkIndexRef = useRef(0);

  const clearProgressTimer = useCallback(() => {
    if (progressTimerRef.current !== null) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const startProgressTimer = useCallback(() => {
    clearProgressTimer();
    progressTimerRef.current = setInterval(() => {
      const audio = audioRef.current;
      const chunk = chunksRef.current[chunkIndexRef.current];
      const offset = chunkOffsetsRef.current[chunkIndexRef.current];
      if (!audio || chunk === undefined || offset === undefined) return;
      if (!audio.duration || Number.isNaN(audio.duration)) return;
      const fraction = Math.min(1, audio.currentTime / audio.duration);
      setCharIndex(offset + Math.round(fraction * chunk.length));
    }, PROGRESS_POLL_MS);
  }, [clearProgressTimer]);

  const releaseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    generationRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;
    clearProgressTimer();
    releaseAudio();
    setState("idle");
    setCharIndex(0);
  }, [releaseAudio, clearProgressTimer]);

  const speak = useCallback(async (
    text: string,
    // Omit voiceId to get the server's default voice (see MARK_VOICE_ID in
    // lib/elevenlabs.ts / app/api/tts/route.ts) — used for course narration,
    // which deliberately never puts that voice id in client-bundled code.
    voiceId?: ElevenLabsVoiceId,
    options: SpeakOptions = {},
  ) => {
    stop();
    const chunks = splitSpeechText(text);
    if (chunks.length === 0) return;

    // Locate each chunk's start offset within the original text so charIndex
    // can be reported against the caller's untouched string. In practice
    // lesson-length text almost always yields a single chunk, so this is
    // exact; indexOf falling back to the running cursor keeps it sane even
    // if a chunk's whitespace was trimmed and no longer matches verbatim.
    const offsets: number[] = [];
    let searchFrom = 0;
    for (const chunk of chunks) {
      const found = text.indexOf(chunk, searchFrom);
      const start = found >= 0 ? found : searchFrom;
      offsets.push(start);
      searchFrom = start + chunk.length;
    }
    chunksRef.current = chunks;
    chunkOffsetsRef.current = offsets;

    const generation = generationRef.current;
    rateRef.current = options.rate ?? 1;

    const playChunk = async (index: number): Promise<void> => {
      if (generation !== generationRef.current) return;
      if (index >= chunks.length) {
        clearProgressTimer();
        setState("idle");
        options.onEnded?.();
        return;
      }
      chunkIndexRef.current = index;

      const controller = new AbortController();
      abortRef.current = controller;
      setState("loading");

      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: chunks[index], voiceId }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
        const blob = await response.blob();
        if (generation !== generationRef.current) return;

        releaseAudio();
        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;
        const audio = new Audio(objectUrl);
        audioRef.current = audio;
        audio.playbackRate = rateRef.current;
        audio.onended = () => {
          clearProgressTimer();
          releaseAudio();
          void playChunk(index + 1);
        };
        audio.onerror = () => {
          clearProgressTimer();
          releaseAudio();
          setState("idle");
          options.onError?.();
        };
        await audio.play();
        setState("playing");
        setCharIndex(offsets[index] ?? 0);
        startProgressTimer();
      } catch (error) {
        if (controller.signal.aborted || generation !== generationRef.current) return;
        console.error("Unable to play ElevenLabs voice", error);
        clearProgressTimer();
        releaseAudio();
        setState("idle");
        options.onError?.();
      }
    };

    await playChunk(0);
  }, [releaseAudio, stop, clearProgressTimer, startProgressTimer]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    clearProgressTimer();
    setState("paused");
  }, [clearProgressTimer]);

  const resume = useCallback(async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
    setState("playing");
    startProgressTimer();
  }, [startProgressTimer]);

  const setRate = useCallback((rate: number) => {
    rateRef.current = rate;
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, []);

  useEffect(() => stop, [stop]);

  return { state, speak, pause, resume, stop, setRate, charIndex };
}

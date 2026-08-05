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
    if (saved && isBAYBIMAIVoice(saved)) setVoiceId(saved);
  }, []);

  const chooseVoice = useCallback((nextVoiceId: ElevenLabsVoiceId) => {
    setVoiceId(nextVoiceId);
    window.localStorage.setItem(VOICE_STORAGE_KEY, nextVoiceId);
  }, []);

  return { voiceId, chooseVoice };
}

export function useElevenLabsVoice() {
  const [state, setState] = useState<ElevenLabsSpeechState>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const generationRef = useRef(0);
  const rateRef = useRef(1);

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
    releaseAudio();
    setState("idle");
  }, [releaseAudio]);

  const speak = useCallback(async (
    text: string,
    voiceId: ElevenLabsVoiceId,
    options: SpeakOptions = {},
  ) => {
    stop();
    const chunks = splitSpeechText(text);
    if (chunks.length === 0) return;

    const generation = generationRef.current;
    rateRef.current = options.rate ?? 1;

    const playChunk = async (index: number): Promise<void> => {
      if (generation !== generationRef.current) return;
      if (index >= chunks.length) {
        setState("idle");
        options.onEnded?.();
        return;
      }

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
          releaseAudio();
          void playChunk(index + 1);
        };
        audio.onerror = () => {
          releaseAudio();
          setState("idle");
          options.onError?.();
        };
        await audio.play();
        setState("playing");
      } catch (error) {
        if (controller.signal.aborted || generation !== generationRef.current) return;
        console.error("Unable to play ElevenLabs voice", error);
        releaseAudio();
        setState("idle");
        options.onError?.();
      }
    };

    await playChunk(0);
  }, [releaseAudio, stop]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setState("paused");
  }, []);

  const resume = useCallback(async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
    setState("playing");
  }, []);

  const setRate = useCallback((rate: number) => {
    rateRef.current = rate;
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, []);

  useEffect(() => stop, [stop]);

  return { state, speak, pause, resume, stop, setRate };
}

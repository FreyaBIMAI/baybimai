"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const NATURAL_VOICE_NAMES: Record<"en" | "zh", RegExp[]> = {
  en: [
    /microsoft (aria|jenny|guy|ryan).*natural/i,
    /\b(ava|samantha|zoe|serena|daniel|karen|moira)\b/i,
    /google (us|uk) english/i,
    /\b(alex|allison|susan|tom)\b/i,
  ],
  zh: [
    /microsoft (xiaoxiao|yunxi|xiaoyi|yunjian).*natural/i,
    /\b(tingting|ting-ting|mei-jia|sin-ji|li-mu|yu-shu)\b/i,
    /google (普通话|國語|粤语|粵語|mandarin|cantonese)/i,
  ],
};

const QUALITY_MARKERS = /natural|premium|enhanced|neural|online/i;
const ROBOTIC_MARKERS = /compact|espeak|festival|robot|novelty|whisper|zarvox|trinoids|boing|bubbles|bells|organ|hysterical|bahh|wobble|princess/i;

export function voiceId(voice: SpeechSynthesisVoice) {
  return `${voice.voiceURI}::${voice.lang}::${voice.name}`;
}

export function displayVoiceName(voice: SpeechSynthesisVoice) {
  return voice.name
    .replace(/^Microsoft\s+/i, "")
    .replace(/\s+Online\s+\(Natural\)/i, " · Natural")
    .replace(/\s+-\s+English\s+\(.+\)$/i, "")
    .replace(/\s+-\s+Chinese\s+\(.+\)$/i, "");
}

export function rankNaturalVoices(
  voices: SpeechSynthesisVoice[],
  locale: string,
) {
  const normalizedLocale = locale.toLowerCase();
  const base = normalizedLocale.split("-")[0] as "en" | "zh";

  return voices
    .filter((voice) => voice.lang.toLowerCase().startsWith(base))
    .map((voice) => {
      const searchable = `${voice.name} ${voice.voiceURI}`;
      let score = 0;
      if (voice.lang.toLowerCase() === normalizedLocale) score += 36;
      if (voice.default) score += 12;
      if (voice.localService) score += 8;
      if (QUALITY_MARKERS.test(searchable)) score += 90;
      NATURAL_VOICE_NAMES[base].forEach((pattern, index) => {
        if (pattern.test(searchable)) score += 80 - index * 12;
      });
      if (ROBOTIC_MARKERS.test(searchable)) score -= 240;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score || a.voice.name.localeCompare(b.voice.name))
    .map(({ voice }) => voice);
}

export function useNaturalVoice(locale: string, storageKey: string) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [requestedVoiceId, setRequestedVoiceId] = useState("");

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synthesis = window.speechSynthesis;
    const loadVoices = () => {
      setVoices(rankNaturalVoices(synthesis.getVoices(), locale));
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setRequestedVoiceId(saved);
    };
    const frame = window.requestAnimationFrame(loadVoices);
    const retry = window.setTimeout(loadVoices, 250);
    synthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
      synthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [locale, storageKey]);

  const selectedVoice = useMemo(
    () => voices.find((voice) => voiceId(voice) === requestedVoiceId) ?? voices[0] ?? null,
    [requestedVoiceId, voices],
  );

  const chooseVoice = useCallback((nextVoiceId: string) => {
    setRequestedVoiceId(nextVoiceId);
    window.localStorage.setItem(storageKey, nextVoiceId);
  }, [storageKey]);

  return {
    voices,
    selectedVoice,
    selectedVoiceId: selectedVoice ? voiceId(selectedVoice) : "",
    chooseVoice,
  };
}

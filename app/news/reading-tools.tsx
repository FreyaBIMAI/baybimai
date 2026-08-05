"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BAYBIMAI_VOICES,
  isBAYBIMAIVoice,
  useElevenLabsVoice,
  useVoicePreference,
} from "../use-elevenlabs-voice";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

const FONT_SCALES = [0.94, 1, 1.1, 1.2] as const;
const BROWSER_CHUNK_LENGTH = 260;

function splitBrowserSpeechText(text: string) {
  const sentences = text
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) ?? [];
  const chunks: string[] = [];
  let current = "";

  const append = (part: string) => {
    const normalized = part.trim();
    if (!normalized) return;
    if (normalized.length > BROWSER_CHUNK_LENGTH) {
      if (current) {
        chunks.push(current);
        current = "";
      }
      for (let index = 0; index < normalized.length; index += BROWSER_CHUNK_LENGTH) {
        chunks.push(normalized.slice(index, index + BROWSER_CHUNK_LENGTH));
      }
      return;
    }
    if (!current) {
      current = normalized;
    } else if (current.length + normalized.length + 1 <= BROWSER_CHUNK_LENGTH) {
      current += ` ${normalized}`;
    } else {
      chunks.push(current);
      current = normalized;
    }
  };

  sentences.forEach(append);
  if (current) chunks.push(current);
  return chunks;
}

export default function ReadingTools({
  lang,
  speechText,
  children,
}: {
  lang: NewsLang;
  speechText: string;
  children: ReactNode;
}) {
  const labels = newsContent[lang].reader;
  const storagePrefix = `baybimai-news-${lang}`;
  const [progress, setProgress] = useState(0);
  const [fontIndex, setFontIndex] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [status, setStatus] = useState<string>(labels.idle);
  const [speechMode, setSpeechMode] = useState<"cloud" | "browser" | null>(null);
  const [nativePaused, setNativePaused] = useState(false);
  const [cloudAvailable, setCloudAvailable] = useState<boolean | null>(null);
  const nativeUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const nativeSession = useRef(0);
  const { voiceId, chooseVoice } = useVoicePreference();
  const {
    state: cloudState,
    speak,
    pause: pauseCloud,
    resume: resumeCloud,
    stop: stopCloud,
  } = useElevenLabsVoice();

  const stopNative = () => {
    nativeSession.current += 1;
    nativeUtterance.current = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setNativePaused(false);
  };

  const startBrowserSpeech = (isFallback = false) => {
    if (
      !("speechSynthesis" in window) ||
      typeof window.SpeechSynthesisUtterance === "undefined" ||
      !speechText.trim()
    ) {
      setSpeechMode(null);
      setStatus(labels.unsupported);
      return;
    }

    const session = nativeSession.current + 1;
    nativeSession.current = session;
    const chunks = splitBrowserSpeechText(speechText);
    if (!chunks.length) {
      setSpeechMode(null);
      setStatus(labels.unsupported);
      return;
    }

    const speakChunk = (index: number) => {
      if (nativeSession.current !== session) return;
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = lang === "zh" ? "zh-CN" : "en-US";
      utterance.rate = 0.96;
      utterance.onstart = () => {
        if (nativeSession.current === session) {
          setSpeechMode("browser");
          setStatus(labels.playing);
        }
      };
      utterance.onend = () => {
        if (nativeSession.current !== session) return;
        if (index + 1 < chunks.length) {
          speakChunk(index + 1);
          return;
        }
        setSpeechMode(null);
        setNativePaused(false);
        setStatus(labels.complete);
      };
      utterance.onerror = () => {
        if (nativeSession.current === session) {
          setSpeechMode(null);
          setNativePaused(false);
          setStatus(labels.unsupported);
        }
      };
      nativeUtterance.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    setSpeechMode("browser");
    setStatus(isFallback ? labels.fallback : labels.playing);
    window.speechSynthesis.cancel();
    speakChunk(0);
  };

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/tts", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) return false;
        const payload = (await response.json()) as { available?: unknown };
        return payload.available === true;
      })
      .then((available) => setCloudAvailable(available))
      .catch(() => {
        if (!controller.signal.aborted) setCloudAvailable(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const initializePreferences = window.setTimeout(() => {
      const savedFont = Number(
        localStorage.getItem(`${storagePrefix}-font`) ?? "1",
      );
      const savedTheme =
        localStorage.getItem(`${storagePrefix}-theme`) === "dark";
      if (
        Number.isInteger(savedFont) &&
        savedFont >= 0 &&
        savedFont < FONT_SCALES.length
      ) {
        setFontIndex(savedFont);
      }
      setDarkMode(savedTheme);

      const savedPosition = Number(
        localStorage.getItem(`${storagePrefix}-position`) ?? "0",
      );
      if (savedPosition > 0) {
        window.scrollTo({ top: savedPosition, behavior: "auto" });
        setStatus(labels.restored);
      }
    }, 120);

    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const article = document.getElementById("article-body");
        if (!article) return;
        const start = article.offsetTop;
        const distance = Math.max(
          article.offsetHeight - window.innerHeight,
          1,
        );
        const value = Math.min(
          100,
          Math.max(0, ((window.scrollY - start) / distance) * 100),
        );
        setProgress(value);
        localStorage.setItem(
          `${storagePrefix}-position`,
          String(Math.round(window.scrollY)),
        );
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.clearTimeout(initializePreferences);
      if (frame) window.cancelAnimationFrame(frame);
      stopNative();
      stopCloud();
    };
  // stopNative and stopCloud both intentionally run only at page teardown.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels.restored, storagePrefix]);

  const changeFont = (direction: -1 | 1) => {
    setFontIndex((current) => {
      const next = Math.min(
        FONT_SCALES.length - 1,
        Math.max(0, current + direction),
      );
      localStorage.setItem(`${storagePrefix}-font`, String(next));
      return next;
    });
  };

  const toggleTheme = () => {
    setDarkMode((current) => {
      localStorage.setItem(
        `${storagePrefix}-theme`,
        current ? "light" : "dark",
      );
      return !current;
    });
  };

  const startReading = () => {
    if (speechMode === "browser" && nativePaused) {
      window.speechSynthesis.resume();
      setNativePaused(false);
      setStatus(labels.playing);
      return;
    }
    if (cloudState === "paused") {
      void resumeCloud();
      setStatus(labels.playing);
      return;
    }

    // Starting native speech synchronously preserves the click activation that
    // mobile browsers require. Cloud speech remains the preferred route once
    // its configuration has been confirmed by the server.
    if (cloudAvailable !== true) {
      startBrowserSpeech();
      return;
    }

    stopNative();
    setSpeechMode("cloud");
    setStatus(labels.loading);
    void speak(speechText, voiceId, {
      rate: 0.96,
      onEnded: () => {
        setSpeechMode(null);
        setStatus(labels.complete);
      },
      onError: () => startBrowserSpeech(true),
    });
  };

  const pauseReading = () => {
    if (speechMode === "browser") {
      window.speechSynthesis.pause();
      setNativePaused(true);
    } else {
      pauseCloud();
    }
    setStatus(labels.paused);
  };

  const stopReading = () => {
    stopNative();
    stopCloud();
    setSpeechMode(null);
    setStatus(labels.stopped);
  };

  const changeVoice = (nextVoiceId: string) => {
    if (!isBAYBIMAIVoice(nextVoiceId)) return;
    stopReading();
    chooseVoice(nextVoiceId);
    setStatus(labels.voiceReady);
  };

  const active = speechMode === "browser" || cloudState === "playing" || cloudState === "paused";
  const paused = speechMode === "browser" ? nativePaused : cloudState === "paused";
  const loading = speechMode === "cloud" && cloudState === "loading";

  const readerStyle = {
    "--reader-scale": FONT_SCALES[fontIndex],
  } as CSSProperties;

  return (
    <div
      className={`${styles.readerShell} ${darkMode ? styles.darkMode : ""}`}
      style={readerStyle}
    >
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={labels.progressLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <aside className={styles.readerToolbar} aria-label={labels.progressLabel}>
        <div className={styles.readerActions}>
          <button
            type="button"
            onClick={startReading}
            disabled={loading}
          >
            {loading ? labels.loading : paused ? labels.resume : labels.listen}
          </button>
          {active && !paused ? (
            <button type="button" onClick={pauseReading}>{labels.pause}</button>
          ) : null}
          {active || loading ? (
            <button type="button" onClick={stopReading}>{labels.stop}</button>
          ) : null}
          <button
            type="button"
            onClick={() => changeFont(-1)}
            disabled={fontIndex === 0}
          >
            {labels.fontSmaller}
          </button>
          <button
            type="button"
            onClick={() => changeFont(1)}
            disabled={fontIndex === FONT_SCALES.length - 1}
          >
            {labels.fontLarger}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={darkMode}
          >
            {darkMode ? labels.light : labels.dark}
          </button>
        </div>
        <label className={styles.voiceControl}>
          <span className={styles.voiceLabel}>{labels.voice}</span>
          <select
            aria-label={labels.voice}
            value={voiceId}
            onChange={(event) => changeVoice(event.target.value)}
            disabled={active || loading}
          >
            {BAYBIMAI_VOICES.map((voice) => (
              <option value={voice.id} key={voice.id}>{voice.name}</option>
            ))}
          </select>
          <span className={styles.fixedVoice}>
            {speechMode === "browser" || cloudAvailable === false
              ? labels.browserVoice
              : labels.cloudVoice}
          </span>
        </label>
        <p className={styles.readerStatus} role="status" aria-live="polite">{status}</p>
      </aside>
      {children}
    </div>
  );
}

"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { displayVoiceName, useNaturalVoice, voiceId } from "../use-natural-voice";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

const SPEEDS = [0.8, 1, 1.2, 1.5] as const;
const FONT_SCALES = [0.94, 1, 1.1, 1.2] as const;

export default function ReadingTools({
  lang,
  children,
}: {
  lang: NewsLang;
  children: ReactNode;
}) {
  const labels = newsContent[lang].reader;
  const storagePrefix = `baybimai-news-${lang}`;
  const [progress, setProgress] = useState(0);
  const [fontIndex, setFontIndex] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [rate, setRate] = useState<(typeof SPEEDS)[number]>(1);
  const [speechState, setSpeechState] = useState<
    "idle" | "playing" | "paused"
  >("idle");
  const [previewingVoice, setPreviewingVoice] = useState(false);
  const [status, setStatus] = useState<string>(labels.idle);
  const segmentsRef = useRef<string[]>([]);
  const segmentIndexRef = useRef(0);
  const rateRef = useRef<number>(1);
  const { voices, selectedVoice, selectedVoiceId, chooseVoice } = useNaturalVoice(
    newsContent[lang].locale,
    `baybimai-reading-voice-${lang}`,
  );

  const stopSpeech = (message: string = labels.stopped) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    segmentIndexRef.current = 0;
    setPreviewingVoice(false);
    setSpeechState("idle");
    setStatus(message);
  };

  const speakNext = () => {
    if (!("speechSynthesis" in window)) {
      setStatus(labels.unsupported);
      return;
    }

    const segment = segmentsRef.current[segmentIndexRef.current];
    if (!segment) {
      stopSpeech(labels.complete);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(segment);
    utterance.lang = newsContent[lang].locale;
    utterance.rate = rateRef.current;
    utterance.pitch = 1;
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.onend = () => {
      segmentIndexRef.current += 1;
      speakNext();
    };
    utterance.onerror = () => {
      setSpeechState("idle");
      setStatus(labels.stopped);
    };
    window.speechSynthesis.speak(utterance);
  };

  const startSpeech = () => {
    if (!("speechSynthesis" in window)) {
      setStatus(labels.unsupported);
      return;
    }

    const article = document.getElementById("article-body");
    if (!article) return;
    segmentsRef.current = Array.from(
      article.querySelectorAll("h1, h2, p, li"),
    )
      .map((element) => element.textContent?.trim() ?? "")
      .filter(Boolean);
    segmentIndexRef.current = 0;
    window.speechSynthesis.cancel();
    setPreviewingVoice(false);
    setSpeechState("playing");
    setStatus(labels.playing);
    speakNext();
  };

  const previewSelectedVoice = () => {
    if (!("speechSynthesis" in window) || !selectedVoice) return;
    window.speechSynthesis.cancel();
    segmentIndexRef.current = 0;
    setSpeechState("idle");
    setPreviewingVoice(true);
    const sample = lang === "zh"
      ? "清楚、自然的声音，让阅读更轻松。"
      : "A calm, confident voice makes focused reading easier.";
    const utterance = new SpeechSynthesisUtterance(sample);
    utterance.lang = newsContent[lang].locale;
    utterance.voice = selectedVoice;
    utterance.rate = lang === "zh" ? 0.92 : 0.96;
    utterance.pitch = 1;
    utterance.onend = () => {
      setPreviewingVoice(false);
      setStatus(labels.voiceReady);
    };
    utterance.onerror = () => setPreviewingVoice(false);
    window.speechSynthesis.speak(utterance);
    setStatus(labels.previewingVoice);
  };

  const changeVoice = (nextVoiceId: string) => {
    window.speechSynthesis?.cancel();
    segmentIndexRef.current = 0;
    setSpeechState("idle");
    setPreviewingVoice(false);
    chooseVoice(nextVoiceId);
    setStatus(labels.voiceReady);
  };

  const togglePause = () => {
    if (!("speechSynthesis" in window)) return;
    if (speechState === "playing") {
      window.speechSynthesis.pause();
      setSpeechState("paused");
      setStatus(labels.paused);
    } else if (speechState === "paused") {
      window.speechSynthesis.resume();
      setSpeechState("playing");
      setStatus(labels.playing);
    }
  };

  const changeRate = (nextRate: (typeof SPEEDS)[number]) => {
    rateRef.current = nextRate;
    setRate(nextRate);
    localStorage.setItem(`${storagePrefix}-rate`, String(nextRate));
    if (speechState !== "idle" && "speechSynthesis" in window) {
      const wasPaused = speechState === "paused";
      window.speechSynthesis.cancel();
      speakNext();
      if (wasPaused) {
        window.setTimeout(() => window.speechSynthesis.pause(), 80);
      }
    }
  };

  useEffect(() => {
    const initializePreferences = window.setTimeout(() => {
      const savedFont = Number(
        localStorage.getItem(`${storagePrefix}-font`) ?? "1",
      );
      const savedRate = Number(
        localStorage.getItem(`${storagePrefix}-rate`) ?? "1",
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
      if (SPEEDS.includes(savedRate as (typeof SPEEDS)[number])) {
        rateRef.current = savedRate;
        setRate(savedRate as (typeof SPEEDS)[number]);
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
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
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
          <button type="button" onClick={startSpeech}>
            {labels.listen}
          </button>
          <button
            type="button"
            onClick={togglePause}
            disabled={speechState === "idle"}
          >
            {speechState === "paused" ? labels.resume : labels.pause}
          </button>
          <button
            type="button"
            onClick={() => stopSpeech()}
            disabled={speechState === "idle"}
          >
            {labels.stop}
          </button>
        </div>

        <label className={styles.speedControl}>
          <span>{labels.speed}</span>
          <select
            value={rate}
            onChange={(event) =>
              changeRate(
                Number(event.target.value) as (typeof SPEEDS)[number],
              )
            }
          >
            {SPEEDS.map((speed) => (
              <option value={speed} key={speed}>
                {speed}×
              </option>
            ))}
          </select>
        </label>

        <div className={styles.readerActions}>
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
        <div className={styles.voiceControl}>
          <label htmlFor={`news-reading-voice-${lang}`}>{labels.voice}</label>
          <select
            id={`news-reading-voice-${lang}`}
            value={selectedVoiceId}
            disabled={voices.length === 0}
            onChange={(event) => changeVoice(event.target.value)}
          >
            {voices.length === 0 && <option value="">{labels.voiceLoading}</option>}
            {voices.map((voice, index) => (
              <option value={voiceId(voice)} key={voiceId(voice)}>
                {displayVoiceName(voice)}{index === 0 ? ` · ${labels.recommended}` : ""}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={previewSelectedVoice}
            disabled={!selectedVoice || previewingVoice}
          >
            {previewingVoice ? labels.previewingVoice : labels.previewVoice}
          </button>
          <p className={styles.readerStatus} aria-live="polite">
            {status}
          </p>
        </div>
      </aside>
      {children}
    </div>
  );
}

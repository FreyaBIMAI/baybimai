"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

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
  const [, setStatus] = useState<string>(labels.idle);

  useEffect(() => {
    // The article reader is visual-only. Stop any speech left running by an
    // older deployment or another tab as soon as this page opens.
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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
      </aside>
      {children}
    </div>
  );
}

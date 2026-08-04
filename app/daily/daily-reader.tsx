"use client";

import { useEffect, useMemo, useState } from "react";
import { dailyCopy, dailyLessons, type DailyLang } from "./daily-content";
import styles from "./daily.module.css";

const STORAGE_KEY = "baybimai-founder-daily-v1";

type Completion = { lessonId: number; date: string };
type StoredProgress = { completed: Completion[]; drafts: Record<string, string> };

const EMPTY_PROGRESS: StoredProgress = { completed: [], drafts: {} };

function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateBefore(date: string, days: number) {
  const value = new Date(`${date}T12:00:00`);
  value.setDate(value.getDate() - days);
  return localDate(value);
}

function sanitizeProgress(value: unknown): StoredProgress {
  if (!value || typeof value !== "object") return EMPTY_PROGRESS;
  const candidate = value as Partial<StoredProgress>;
  const completed = Array.isArray(candidate.completed)
    ? candidate.completed.filter(
        (entry): entry is Completion =>
          Boolean(entry) &&
          Number.isInteger(entry.lessonId) &&
          entry.lessonId >= 1 &&
          entry.lessonId <= dailyLessons.length &&
          typeof entry.date === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(entry.date),
      )
    : [];
  const unique = Array.from(new Map(completed.map((entry) => [entry.lessonId, entry])).values())
    .sort((a, b) => a.lessonId - b.lessonId);
  const drafts = candidate.drafts && typeof candidate.drafts === "object"
    ? Object.fromEntries(
        Object.entries(candidate.drafts).filter(
          ([key, draft]) => /^\d+$/.test(key) && typeof draft === "string",
        ),
      )
    : {};
  return { completed: unique, drafts };
}

function calculateStreak(completed: Completion[], today: string) {
  const dates = new Set(completed.map((entry) => entry.date));
  let cursor = dates.has(today) ? today : dateBefore(today, 1);
  let streak = 0;
  while (dates.has(cursor)) {
    streak += 1;
    cursor = dateBefore(cursor, 1);
  }
  return streak;
}

export default function DailyReader({ lang }: { lang: DailyLang }) {
  const copy = dailyCopy[lang];
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [speechState, setSpeechState] = useState<"idle" | "playing" | "paused">("idle");
  const [speed, setSpeed] = useState(1);
  const [status, setStatus] = useState("");
  const today = localDate();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(sanitizeProgress(JSON.parse(saved)));
    } catch {
      setProgress(EMPTY_PROGRESS);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const completedIds = useMemo(
    () => new Set(progress.completed.map((entry) => entry.lessonId)),
    [progress.completed],
  );
  const completedToday = progress.completed.find((entry) => entry.date === today);
  const nextLesson = dailyLessons.find((lesson) => !completedIds.has(lesson.id));
  const lesson = completedToday
    ? dailyLessons.find((item) => item.id === completedToday.lessonId) ?? dailyLessons[0]
    : nextLesson ?? dailyLessons[dailyLessons.length - 1];
  const isLessonComplete = completedIds.has(lesson.id);
  const allComplete = progress.completed.length >= dailyLessons.length;
  const streak = calculateStreak(progress.completed, today);
  const draft = progress.drafts[String(lesson.id)] ?? "";
  const progressPercent = Math.round((progress.completed.length / dailyLessons.length) * 100);

  function persist(next: StoredProgress) {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep the lesson usable when private browsing blocks local storage.
    }
  }

  function updateDraft(value: string) {
    persist({ ...progress, drafts: { ...progress.drafts, [String(lesson.id)]: value } });
    setStatus(copy.saved);
  }

  function completeLesson() {
    if (isLessonComplete) return;
    persist({
      ...progress,
      completed: [...progress.completed, { lessonId: lesson.id, date: today }],
    });
    window.speechSynthesis?.cancel();
    setSpeechState("idle");
    setStatus(lesson.id === dailyLessons.length ? copy.roundComplete : copy.doneToday);
  }

  function listen() {
    if (!("speechSynthesis" in window)) {
      setStatus(copy.speechUnsupported);
      return;
    }
    if (speechState === "paused") {
      window.speechSynthesis.resume();
      setSpeechState("playing");
      setStatus(copy.speechPlaying);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.article.join(" ")} ${copy.phraseTitle}. ${lesson.phrase}. ${copy.speakTitle}. ${lesson.sayIt}`,
    );
    utterance.lang = "en-US";
    utterance.rate = speed;
    const voice = window.speechSynthesis
      .getVoices()
      .find((candidate) => candidate.lang.toLowerCase().startsWith("en"));
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeechState("idle");
    utterance.onerror = () => setSpeechState("idle");
    window.speechSynthesis.speak(utterance);
    setSpeechState("playing");
    setStatus(copy.speechPlaying);
  }

  function pause() {
    window.speechSynthesis.pause();
    setSpeechState("paused");
    setStatus(copy.speechPaused);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeechState("idle");
    setStatus(copy.speechStopped);
  }

  return (
    <>
      <section className={styles.readingSection} id="today" aria-labelledby="today-title">
        <div className={styles.progressStrip} aria-label={copy.completed}>
          <div><span>{copy.streak}</span><strong>{ready ? streak : "–"} {copy.streakUnit}</strong></div>
          <div><span>{copy.completed}</span><strong>{ready ? progress.completed.length : "–"} / 28</strong></div>
          <div className={styles.progressTrackWrap}>
            <span>{copy.total}</span>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={28}
              aria-valuenow={progress.completed.length}
              aria-label={copy.completed}
            ><span style={{ width: `${progressPercent}%` }} /></div>
          </div>
        </div>

        <article className={styles.readingCard} aria-busy={!ready}>
          <header className={styles.lessonHeader}>
            <div>
              <p className={styles.lessonMeta}>{copy.today} · {copy.day} {lesson.id}{copy.daySuffix} · {lesson.category}</p>
              <h2 id="today-title">{lesson.title}</h2>
            </div>
            <span className={styles.weekPill}>{copy.week.replace("{week}", String(lesson.week))}</span>
          </header>

          <div className={styles.articleCopy} lang="en">
            {lesson.article.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className={styles.audioControls} aria-label={copy.listen}>
            <button type="button" onClick={listen}>
              <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                <path d="M4 2.8v10.4L13 8 4 2.8Z" fill="currentColor" />
              </svg>
              {speechState === "paused" ? copy.resume : copy.listen}
            </button>
            {speechState === "playing" && <button type="button" onClick={pause}>{copy.pause}</button>}
            {speechState !== "idle" && <button type="button" onClick={stop}>{copy.stop}</button>}
            <label>
              <span>{copy.speed}</span>
              <select value={speed} onChange={(event) => { setSpeed(Number(event.target.value)); if (speechState !== "idle") stop(); }}>
                <option value="0.85">0.85×</option><option value="1">1×</option><option value="1.15">1.15×</option>
              </select>
            </label>
          </div>

          <button
            className={styles.helpButton}
            type="button"
            aria-expanded={helpOpen}
            aria-controls="daily-help"
            onClick={() => setHelpOpen((open) => !open)}
          >
            {helpOpen ? copy.hideHelp : copy.showHelp}<span aria-hidden="true">{helpOpen ? "−" : "+"}</span>
          </button>

          {helpOpen && (
            <aside className={styles.helpPanel} id="daily-help">
              <p className={styles.smallLabel}>{copy.helpTitle}</p>
              {lang === "zh"
                ? lesson.translationZh.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : <p>{lesson.takeawayEn}</p>}
            </aside>
          )}

          <div className={styles.practiceGrid}>
            <section>
              <p className={styles.smallLabel}>{copy.phraseTitle}</p>
              <blockquote lang="en">{lesson.phrase}</blockquote>
              {lang === "zh" && <p>{lesson.phraseZh}</p>}
            </section>
            <section>
              <p className={styles.smallLabel}>{copy.speakTitle}</p>
              <blockquote lang="en">{lesson.sayIt}</blockquote>
            </section>
          </div>

          <section className={styles.writingBlock}>
            <label htmlFor={`daily-draft-${lesson.id}`}>{copy.writeTitle}</label>
            <p>{lang === "zh" ? lesson.promptZh : lesson.promptEn}</p>
            <textarea
              id={`daily-draft-${lesson.id}`}
              value={draft}
              rows={4}
              placeholder={copy.draftPlaceholder}
              onChange={(event) => updateDraft(event.target.value)}
              spellCheck
            />
            <span>{copy.saved}</span>
          </section>

          <div className={styles.completionRow}>
            <button className={styles.completeButton} type="button" disabled={!ready || isLessonComplete || allComplete} onClick={completeLesson}>
              {isLessonComplete ? (allComplete ? copy.roundComplete : copy.doneToday) : copy.complete}
            </button>
          </div>
          <p className={styles.liveStatus} role="status" aria-live="polite">{status}</p>
        </article>
      </section>

      <section className={styles.routeSection} aria-labelledby="route-title">
        <div className={styles.routeHeading}>
          <div><p className={styles.eyebrow}>THE ROUTE</p><h2 id="route-title">{copy.routeTitle}</h2></div>
          <p>{copy.routeIntro}<br />{copy.localNote}</p>
        </div>
        <div className={styles.weekGrid}>
          {[1, 2, 3, 4].map((week) => (
            <article className={styles.weekCard} key={week}>
              <p>{copy.week.replace("{week}", String(week))}</p>
              <h3>{copy.weekNames[week - 1]}</h3>
              <div className={styles.dayGrid} aria-label={copy.weekNames[week - 1]}>
                {dailyLessons.filter((item) => item.week === week).map((item) => {
                  const state = completedIds.has(item.id) ? "completed" : item.id === lesson.id ? "current" : "future";
                  return <span key={item.id} data-state={state} aria-label={`${copy.day} ${item.id}: ${state}`}>{String(item.id).padStart(2, "0")}</span>;
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BAYBIMAI_VOICES,
  isBAYBIMAIVoice,
  useElevenLabsVoice,
  useVoicePreference,
} from "../use-elevenlabs-voice";
import type { DailyCopy, DailyLang, DailyLesson } from "./daily-content";
import styles from "./daily.module.css";

const STORAGE_KEY = "baybimai-founder-daily-v1";

type Completion = { lessonId: number; date: string };
type StoredProgress = { completed: Completion[]; drafts: Record<string, string> };

const EMPTY_PROGRESS: StoredProgress = { completed: [], drafts: {} };

type WordToken = { text: string; start: number; end: number; paragraphIndex: number; tokenIndex: number };

// Tokenizes each paragraph into words with character offsets relative to
// `paragraphs.join(" ")` — the exact string handed to the TTS hook — so the
// approximate playback charIndex it reports can be mapped back to a word.
function tokenizeArticle(paragraphs: string[]): WordToken[] {
  const tokens: WordToken[] = [];
  let offset = 0;
  paragraphs.forEach((paragraph, paragraphIndex) => {
    const wordPattern = /\S+/g;
    let match: RegExpExecArray | null;
    let tokenIndex = 0;
    while ((match = wordPattern.exec(paragraph)) !== null) {
      const start = offset + match.index;
      tokens.push({
        text: match[0],
        start,
        end: start + match[0].length,
        paragraphIndex,
        tokenIndex,
      });
      tokenIndex += 1;
    }
    offset += paragraph.length + 1; // +1 for the space joining paragraphs
  });
  return tokens;
}

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

function sanitizeProgress(value: unknown, lessonCount: number): StoredProgress {
  if (!value || typeof value !== "object") return EMPTY_PROGRESS;
  const candidate = value as Partial<StoredProgress>;
  const completed = Array.isArray(candidate.completed)
    ? candidate.completed.filter(
        (entry): entry is Completion =>
          Boolean(entry) &&
          Number.isInteger(entry.lessonId) &&
          entry.lessonId >= 1 &&
          entry.lessonId <= lessonCount &&
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

export default function DailyReader({
  lang,
  copy,
  lessons,
}: {
  lang: DailyLang;
  copy: DailyCopy;
  lessons: DailyLesson[];
}) {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [speechMode, setSpeechMode] = useState<"lesson" | "preview" | null>(null);
  const [speed, setSpeed] = useState(1);
  const [status, setStatus] = useState("");
  const {
    state: speechState,
    speak,
    pause: pauseVoice,
    resume,
    stop: stopVoice,
    setRate: setPlaybackRate,
    charIndex,
  } = useElevenLabsVoice();
  const { voiceId, chooseVoice } = useVoicePreference();
  const previewingVoice = speechMode === "preview" && speechState !== "idle";
  const today = localDate();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setProgress(sanitizeProgress(JSON.parse(saved), lessons.length));
      } catch {
        setProgress(EMPTY_PROGRESS);
      } finally {
        setReady(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lessons.length]);

  const completedIds = useMemo(
    () => new Set(progress.completed.map((entry) => entry.lessonId)),
    [progress.completed],
  );
  const completedToday = progress.completed.find((entry) => entry.date === today);
  const nextLesson = lessons.find((lesson) => !completedIds.has(lesson.id));
  const lesson = completedToday
    ? lessons.find((item) => item.id === completedToday.lessonId) ?? lessons[0]
    : nextLesson ?? lessons[lessons.length - 1];
  const isLessonComplete = completedIds.has(lesson.id);
  const allComplete = progress.completed.length >= lessons.length;
  const streak = calculateStreak(progress.completed, today);
  const draft = progress.drafts[String(lesson.id)] ?? "";
  const progressPercent = Math.round((progress.completed.length / lessons.length) * 100);

  // The spoken string is `${title}. ${article}. ...` — this is where the
  // article body starts within it, so the global charIndex the hook reports
  // can be translated into a local offset for word-cursor highlighting.
  const articleStart = `${lesson.title}. `.length;
  const articleTokens = useMemo(() => tokenizeArticle(lesson.article), [lesson.article]);
  const articleLength = useMemo(
    () => lesson.article.reduce((sum, paragraph) => sum + paragraph.length + 1, -1),
    [lesson.article],
  );
  const showCursor =
    speechMode === "lesson" &&
    (speechState === "playing" || speechState === "paused") &&
    charIndex >= articleStart &&
    charIndex < articleStart + articleLength;
  const localCharIndex = charIndex - articleStart;
  const activeToken = useMemo(() => {
    if (!showCursor) return null;
    let active: WordToken | null = null;
    for (const token of articleTokens) {
      if (token.start <= localCharIndex) active = token;
      else break;
    }
    return active;
  }, [articleTokens, showCursor, localCharIndex]);

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
    stopVoice();
    setSpeechMode(null);
    setStatus(lesson.id === lessons.length ? copy.roundComplete : copy.doneToday);
  }

  function listen() {
    if (speechState === "paused") {
      void resume();
      setStatus(copy.speechPlaying);
      return;
    }
    const text = `${lesson.title}. ${lesson.article.join(" ")} ${copy.phraseTitle}. ${lesson.phrase}. ${copy.speakTitle}. ${lesson.sayIt}`;
    setSpeechMode("lesson");
    setStatus(copy.speechLoading);
    void speak(text, voiceId, {
      rate: speed,
      onEnded: () => {
        setSpeechMode(null);
        setStatus(copy.speechComplete);
      },
      onError: () => {
        setSpeechMode(null);
        setStatus(copy.speechError);
      },
    });
  }

  function previewVoice() {
    setSpeechMode("preview");
    setStatus(copy.previewingVoice);
    void speak("A clear message earns the next conversation.", voiceId, {
      rate: 0.96,
      onEnded: () => {
        setSpeechMode(null);
        setStatus(copy.voiceReady);
      },
      onError: () => {
        setSpeechMode(null);
        setStatus(copy.speechError);
      },
    });
  }

  function changeVoice(nextVoiceId: string) {
    if (!isBAYBIMAIVoice(nextVoiceId)) return;
    stopVoice();
    setSpeechMode(null);
    chooseVoice(nextVoiceId);
    setStatus(copy.voiceReady);
  }

  function pause() {
    pauseVoice();
    setStatus(copy.speechPaused);
  }

  function stop() {
    stopVoice();
    setSpeechMode(null);
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
            {lesson.article.map((paragraph, paragraphIndex) => (
              <p key={paragraph}>
                {articleTokens
                  .filter((token) => token.paragraphIndex === paragraphIndex)
                  .map((token, index, paragraphTokens) => (
                    <span key={token.start}>
                      <span
                        className={
                          activeToken?.start === token.start
                            ? `${styles.word} ${styles.activeWord}`
                            : styles.word
                        }
                      >
                        {token.text}
                      </span>
                      {index < paragraphTokens.length - 1 ? " " : ""}
                    </span>
                  ))}
              </p>
            ))}
          </div>

          <div className={styles.audioControls} aria-label={copy.listen}>
            <button type="button" onClick={listen}>
              <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                <path d="M4 2.8v10.4L13 8 4 2.8Z" fill="currentColor" />
              </svg>
              {speechMode === "lesson" && speechState === "loading"
                ? copy.speechLoading
                : speechState === "paused"
                  ? copy.resume
                  : copy.listen}
            </button>
            {speechState === "playing" && <button type="button" onClick={pause}>{copy.pause}</button>}
            {speechState !== "idle" && <button type="button" onClick={stop}>{copy.stop}</button>}
            <label>
              <span>{copy.speed}</span>
              <select value={speed} onChange={(event) => { const next = Number(event.target.value); setSpeed(next); setPlaybackRate(next); }}>
                <option value="0.85">0.85×</option><option value="1">1×</option><option value="1.15">1.15×</option>
              </select>
            </label>
            <div className={styles.voiceControl}>
              <span className={styles.voiceLabel}>{copy.voice}</span>
              <select
                aria-label={copy.voice}
                value={voiceId}
                onChange={(event) => changeVoice(event.target.value)}
              >
                {BAYBIMAI_VOICES.map((voice) => (
                  <option value={voice.id} key={voice.id}>{voice.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={previewVoice}
                disabled={previewingVoice}
              >
                {previewingVoice ? copy.previewingVoice : copy.previewVoice}
              </button>
            </div>
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
                {lessons.filter((item) => item.week === week).map((item) => {
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

"use client";

import { useEffect, useState } from "react";
import { useElevenLabsVoice } from "./use-elevenlabs-voice";
import Reveal from "./reveal";
import type { Lang } from "./dictionaries";
import type { SyllabusModule } from "./course-revit-fast-start-content";
import styles from "./course-syllabus.module.css";

const NARRATION_LABELS: Record<Lang, { play: string; pause: string; resume: string; stop: string; loading: string }> = {
  zh: { play: "🔊 用 Mark 的声音听课程介绍", pause: "暂停", resume: "继续播放", stop: "停止", loading: "加载中…" },
  en: { play: "🔊 Listen with Mark's voice", pause: "Pause", resume: "Resume", stop: "Stop", loading: "Loading…" },
};

const TRANSCRIPT_LABEL: Record<Lang, string> = { zh: "文稿", en: "Transcript" };

// Reads the hero intro copy aloud with the course-narration voice (Mark).
// Kept separate from the news/Founder Daily reader (ReadingTools in
// app/news/reading-tools.tsx): that one lets readers pick Adam/Hope and
// tracks a read-along cursor across a whole article; this one is a single
// fixed voice for a short paragraph, so it doesn't need that machinery.
export function CourseIntroNarration({ lang, text }: { lang: Lang; text: string }) {
  const labels = NARRATION_LABELS[lang];
  const { state, speak, pause, resume, stop } = useElevenLabsVoice();

  const handlePrimary = () => {
    // No voiceId: the server defaults to the course-narration voice (Mark),
    // see app/api/tts/route.ts — its id never needs to reach the browser.
    if (state === "idle") void speak(text);
    else if (state === "playing") pause();
    else if (state === "paused") void resume();
  };

  const primaryLabel =
    state === "playing" ? labels.pause
    : state === "paused" ? labels.resume
    : state === "loading" ? labels.loading
    : labels.play;

  return (
    <div className={styles.narration}>
      <button type="button" className={styles.narrationButton} onClick={handlePrimary} disabled={state === "loading"}>
        {primaryLabel}
      </button>
      {state !== "idle" && (
        <button type="button" className={styles.narrationStop} onClick={stop}>
          {labels.stop}
        </button>
      )}
    </div>
  );
}

// Fetches, once, which lesson codes currently have a transcript uploaded to
// the netdisk folder (see /api/course-transcript and lib/baidu-netdisk.ts),
// then renders the same module/lesson list the server already produced,
// adding a "文稿" link only where one will actually resolve. Progressive
// enhancement: with JS disabled or before the fetch resolves, the page still
// shows the full lesson list, just without transcript links yet.
export function CourseSyllabusBody({ lang, modules }: { lang: Lang; modules: SyllabusModule[] }) {
  const [codes, setCodes] = useState<Set<string>>(new Set());
  const transcriptLabel = TRANSCRIPT_LABEL[lang];

  useEffect(() => {
    let cancelled = false;
    fetch("/api/course-transcript")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { codes?: string[] } | null) => {
        if (!cancelled && data?.codes?.length) setCodes(new Set(data.codes));
      })
      .catch(() => {
        // Transcript manifest is a progressive enhancement — a failed fetch
        // just means no transcript links render, not a broken page.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {modules.map((module, index) => (
        <Reveal delay={Math.min(index * 40, 320)} key={module.number}>
          <section className={styles.module} aria-labelledby={`module-${module.number}`}>
            <div className={styles.moduleHead}>
              <span className={styles.moduleNumber}>{module.number}</span>
              <h2 id={`module-${module.number}`}>{module.title}</h2>
            </div>
            <ul className={styles.lessons}>
              {module.lessons.map((lesson) => (
                <li className={styles.lesson} key={`${module.number}-${lesson.code}`}>
                  <span className={styles.lessonCode}>{lesson.code}</span>
                  <span className={styles.lessonTitle}>{lesson.title}</span>
                  <span className={styles.lessonMinutes}>{lesson.minutes} min</span>
                  {codes.has(lesson.code) && (
                    <a
                      className={styles.lessonTranscript}
                      href={`/api/course-transcript?code=${encodeURIComponent(lesson.code)}`}
                    >
                      {transcriptLabel}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </>
  );
}

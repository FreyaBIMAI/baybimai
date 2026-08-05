"use client";

import { useState } from "react";
import styles from "./news.module.css";

type LiveMode = "weekly" | "interview";

const copy = {
  zh: {
    eyebrow: "BAYBIMAI LIVE",
    weekly: "本周解读",
    interview: "HR 模拟面试",
    weeklyTitle: "Freya 的本周 BIM 现场解读",
    interviewTitle: "和 Freya 做一次英文 HR Mock Interview",
    weeklyBody: "把本周行业变化讲成人能听懂、工作中能用的判断。",
    interviewBody: "真实面试节奏，练自我介绍、追问与英文表达。",
    schedule: "每周一 · 8:00 AM PT",
    interviewSchedule: "预约制 · 25 分钟",
    offline: "下场直播准备中",
    remind: "预约提醒",
    book: "预约模拟面试",
    close: "收起直播窗口",
    expand: "打开直播窗口",
  },
  en: {
    eyebrow: "BAYBIMAI LIVE",
    weekly: "Weekly brief",
    interview: "HR mock interview",
    weeklyTitle: "This week in BIM, with Freya",
    interviewTitle: "Practice a real HR interview with Freya",
    weeklyBody: "A practical read on the changes that matter in BIM, VDC, estimating, and construction AI.",
    interviewBody: "A realistic English interview covering your introduction, follow-ups, and delivery.",
    schedule: "Mondays · 8:00 AM PT",
    interviewSchedule: "By appointment · 25 min",
    offline: "Next live session is being prepared",
    remind: "Get a reminder",
    book: "Book a mock interview",
    close: "Collapse live window",
    expand: "Open live window",
  },
};

export default function LiveWindow({ lang }: { lang: "zh" | "en" }) {
  const labels = copy[lang];
  const [mode, setMode] = useState<LiveMode>("weekly");
  const [collapsed, setCollapsed] = useState(false);
  const isWeekly = mode === "weekly";

  if (collapsed) {
    return (
      <button
        className={styles.liveCollapsed}
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label={labels.expand}
      >
        <span className={styles.liveDot} />
        LIVE
      </button>
    );
  }

  return (
    <aside className={styles.liveWindow} aria-label={labels.eyebrow}>
      <div className={styles.liveStage}>
        <div className={styles.liveTopline}>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} /> LIVE
          </span>
          <button
            type="button"
            className={styles.liveClose}
            onClick={() => setCollapsed(true)}
            aria-label={labels.close}
          >
            −
          </button>
        </div>
        <div className={styles.hostPortrait} aria-hidden="true">
          <span>F</span>
          <div className={styles.cameraFrame} />
        </div>
        <div className={styles.liveOffline}>{labels.offline}</div>
      </div>

      <div className={styles.liveContent}>
        <p className={styles.liveEyebrow}>{labels.eyebrow}</p>
        <div className={styles.liveTabs} role="tablist" aria-label={labels.eyebrow}>
          <button
            type="button"
            role="tab"
            aria-selected={isWeekly}
            onClick={() => setMode("weekly")}
          >
            {labels.weekly}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isWeekly}
            onClick={() => setMode("interview")}
          >
            {labels.interview}
          </button>
        </div>
        <h2>{isWeekly ? labels.weeklyTitle : labels.interviewTitle}</h2>
        <p className={styles.liveBody}>
          {isWeekly ? labels.weeklyBody : labels.interviewBody}
        </p>
        <div className={styles.liveFooter}>
          <span>{isWeekly ? labels.schedule : labels.interviewSchedule}</span>
          <a href="mailto:hello@baybimai.org?subject=BAYBIMAI%20Live">
            {isWeekly ? labels.remind : labels.book} →
          </a>
        </div>
      </div>
    </aside>
  );
}

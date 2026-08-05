"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./news.module.css";

const copy = {
  zh: {
    eyebrow: "BAYBIMAI 教授直播间",
    title: "Freya 教授 · 本周 BIM 新闻播报",
    body: "每周读取本页最新内容，播报 BIM、VDC、造价与施工 AI 的关键变化。",
    schedule: "每周更新 · 太平洋时间",
    ready: "本周新闻已就绪",
    playing: "教授正在播报",
    paused: "播报已暂停",
    start: "开始播报",
    pause: "暂停",
    resume: "继续",
    stop: "结束",
    close: "收起教授直播间",
    expand: "打开教授直播间",
    unsupported: "当前浏览器不支持语音播报",
  },
  en: {
    eyebrow: "BAYBIMAI PROFESSOR LIVE",
    title: "Professor Freya · Weekly BIM News",
    body: "A weekly broadcast of the newest BIM, VDC, estimating, and construction AI signals on this page.",
    schedule: "Updated weekly · Pacific Time",
    ready: "This week's briefing is ready",
    playing: "Professor is presenting",
    paused: "Broadcast paused",
    start: "Play briefing",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    close: "Collapse professor live",
    expand: "Open professor live",
    unsupported: "Speech is not supported in this browser",
  },
};

export default function LiveWindow({ lang }: { lang: "zh" | "en" }) {
  const labels = copy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const segments = useRef<string[]>([]);
  const index = useRef(0);

  const speakNext = () => {
    if (!("speechSynthesis" in window)) return;
    const text = segments.current[index.current];
    if (!text) {
      setState("idle");
      index.current = 0;
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "zh" ? "zh-CN" : "en-US";
    utterance.rate = 0.94;
    const voice = window.speechSynthesis
      .getVoices()
      .find((item) => item.lang.toLowerCase().startsWith(lang));
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      index.current += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  const start = () => {
    if (!("speechSynthesis" in window)) return;
    const article = document.getElementById("article-body");
    if (!article) return;
    segments.current = Array.from(article.querySelectorAll("h1, h2, p, li"))
      .map((item) => item.textContent?.trim() ?? "")
      .filter(Boolean);
    index.current = 0;
    window.speechSynthesis.cancel();
    setState("playing");
    speakNext();
  };

  const togglePause = () => {
    if (!("speechSynthesis" in window)) return;
    if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
    }
  };

  const stop = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    index.current = 0;
    setState("idle");
  };

  useEffect(() => () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  if (collapsed) {
    return (
      <button className={styles.liveCollapsed} type="button" onClick={() => setCollapsed(false)} aria-label={labels.expand}>
        <span className={styles.liveDot} /> 教授播报
      </button>
    );
  }

  const status = state === "playing" ? labels.playing : state === "paused" ? labels.paused : labels.ready;

  return (
    <aside className={`${styles.liveWindow} ${state === "playing" ? styles.isBroadcasting : ""}`} aria-label={labels.eyebrow}>
      <div className={styles.liveStage}>
        <img className={styles.professorImage} src="/baybimai-professor-host.png" alt={lang === "zh" ? "BAYBIMAI 教授型新闻主播" : "BAYBIMAI professor news host"} />
        <div className={styles.liveTopline}>
          <span className={styles.liveBadge}><span className={styles.liveDot} /> LIVE</span>
          <button type="button" className={styles.liveClose} onClick={() => setCollapsed(true)} aria-label={labels.close}>−</button>
        </div>
        <div className={styles.liveOffline}>
          <span className={styles.soundBars} aria-hidden="true"><i /><i /><i /><i /></span>
          {status}
        </div>
      </div>

      <div className={styles.liveContent}>
        <p className={styles.liveEyebrow}>{labels.eyebrow}</p>
        <h2>{labels.title}</h2>
        <p className={styles.liveBody}>{labels.body}</p>
        <div className={styles.broadcastControls}>
          {state === "idle" ? <button type="button" onClick={start}>{labels.start} ▶</button> : null}
          {state !== "idle" ? <button type="button" onClick={togglePause}>{state === "paused" ? labels.resume : labels.pause}</button> : null}
          {state !== "idle" ? <button type="button" onClick={stop}>{labels.stop}</button> : null}
        </div>
        <div className={styles.liveFooter}><span>{labels.schedule}</span><strong>WEEKLY · 08</strong></div>
      </div>
    </aside>
  );
}

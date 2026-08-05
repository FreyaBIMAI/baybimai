"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./news.module.css";

const labels = {
  eyebrow: "BAYBIMAI PROFESSOR LIVE",
  title: "Professor Freya · Weekly BIM News",
  body: "An English briefing on the BIM, VDC, estimating, and construction AI developments that matter this week.",
  schedule: "Updated weekly · Pacific Time",
  ready: "This week's English briefing is ready",
  playing: "Professor is presenting",
  paused: "Broadcast paused",
  start: "Play in English",
  pause: "Pause",
  resume: "Resume",
  stop: "Stop",
  close: "Collapse professor live",
  expand: "Open professor live",
};

const englishBriefing = [
  "Welcome to BAYBIMAI Weekly. I am Professor Freya. Here is your BIM and construction technology briefing for August fifth, twenty twenty-six.",
  "Our lead story is Autodesk Forma. Its July construction release includes more than seventy updates across data management, model management, construction operations, and preconstruction.",
  "The practical AI signals are especially important. Autodesk introduced AI-assisted room and area detection, mobile AI support for creating RFIs, and automated resource date setup using cost and schedule information. AI is moving out of a separate chat box and into the daily workflow.",
  "Procore also announced a proposed seven hundred and fifty million dollar convertible senior notes offering. This is a capital-market action, not a promise that all proceeds will fund AI. Still, it arrives just after Procore expanded its Digital Coworker packages and agent library, showing how product competition and capital investment are now moving together.",
  "Trimble is taking AI takeoff from product release into estimator education. Its upcoming electrical takeoff session focuses on conversational AI, automation, accuracy, and winning more profitable work. The key question is no longer whether AI can identify quantities, but how teams review the results and measure business impact.",
  "For BIM and VDC professionals, this week's takeaway is clear. Build evidence around repeatable standards, model quality review, connected cost and schedule data, and measurable workflow outcomes. Software operation remains useful, but workflow judgment is becoming more valuable.",
  "That concludes this week's BAYBIMAI briefing. The sources and full analysis are available on this page.",
];

export default function LiveWindow({ lang: _lang }: { lang: "zh" | "en" }) {
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
    utterance.lang = "en-US";
    utterance.rate = 0.94;
    const voice = window.speechSynthesis
      .getVoices()
      .find((item) => item.lang.toLowerCase().startsWith("en"));
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      index.current += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  const start = () => {
    if (!("speechSynthesis" in window)) return;
    segments.current = englishBriefing;
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

  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (collapsed) {
    return (
      <button className={styles.liveCollapsed} type="button" onClick={() => setCollapsed(false)} aria-label={labels.expand}>
        <span className={styles.liveDot} /> PROFESSOR LIVE
      </button>
    );
  }

  const status = state === "playing" ? labels.playing : state === "paused" ? labels.paused : labels.ready;

  return (
    <aside className={`${styles.liveWindow} ${state === "playing" ? styles.isBroadcasting : ""}`} aria-label={labels.eyebrow}>
      <div className={styles.liveStage}>
        <img className={styles.professorImage} src="/baybimai-professor-host.png" alt="BAYBIMAI professor news host" />
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

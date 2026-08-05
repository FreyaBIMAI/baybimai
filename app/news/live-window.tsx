"use client";

import { useState } from "react";
import {
  BAYBIMAI_VOICES,
  isBAYBIMAIVoice,
  useElevenLabsVoice,
  useVoicePreference,
} from "../use-elevenlabs-voice";
import styles from "./news.module.css";

const labels = {
  eyebrow: "BAYBIMAI PROFESSOR LIVE",
  title: "Professor Freya · Weekly BIM News",
  body: "An English briefing on the BIM, VDC, estimating, and construction AI developments that matter this week.",
  schedule: "Updated weekly · Pacific Time",
  ready: "This week's English briefing is ready",
  loading: "Preparing the selected studio voice",
  playing: "Professor is presenting",
  previewing: "Previewing the selected voice",
  paused: "Broadcast paused",
  error: "Voice is temporarily unavailable. Please try again.",
  start: "Play in English",
  preview: "Preview voice",
  pause: "Pause",
  resume: "Resume",
  stop: "Stop",
  voice: "Studio voice",
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
  const [mode, setMode] = useState<"briefing" | "preview" | null>(null);
  const [error, setError] = useState(false);
  const { voiceId, chooseVoice } = useVoicePreference();
  const {
    state,
    speak,
    pause,
    resume,
    stop: stopVoice,
  } = useElevenLabsVoice();

  const start = () => {
    setError(false);
    setMode("briefing");
    void speak(englishBriefing.join(" "), voiceId, {
      rate: 0.94,
      onEnded: () => setMode(null),
      onError: () => {
        setMode(null);
        setError(true);
      },
    });
  };

  const togglePause = () => {
    if (state === "playing") {
      pause();
    } else if (state === "paused") {
      void resume();
    }
  };

  const stop = () => {
    stopVoice();
    setMode(null);
    setError(false);
  };

  const preview = () => {
    setError(false);
    setMode("preview");
    void speak("Welcome to BAYBIMAI Weekly. Here is your construction technology briefing.", voiceId, {
      rate: 0.96,
      onEnded: () => setMode(null),
      onError: () => {
        setMode(null);
        setError(true);
      },
    });
  };

  const changeVoice = (nextVoiceId: string) => {
    if (!isBAYBIMAIVoice(nextVoiceId)) return;
    stop();
    chooseVoice(nextVoiceId);
  };

  const collapse = () => {
    stop();
    setCollapsed(true);
  };

  if (collapsed) {
    return (
      <button className={styles.liveCollapsed} type="button" onClick={() => setCollapsed(false)} aria-label={labels.expand}>
        <span className={styles.liveDot} /> PROFESSOR LIVE
      </button>
    );
  }

  const status = error
    ? labels.error
    : state === "loading"
      ? labels.loading
      : state === "paused"
        ? labels.paused
        : state === "playing" && mode === "preview"
          ? labels.previewing
          : state === "playing"
            ? labels.playing
            : labels.ready;

  return (
    <aside className={`${styles.liveWindow} ${state === "playing" && mode === "briefing" ? styles.isBroadcasting : ""}`} aria-label={labels.eyebrow}>
      <div className={styles.liveStage}>
        <img className={styles.professorImage} src="/baybimai-professor-host.png" alt="BAYBIMAI professor news host" />
        <div className={styles.liveTopline}>
          <span className={styles.liveBadge}><span className={styles.liveDot} /> LIVE</span>
          <button type="button" className={styles.liveClose} onClick={collapse} aria-label={labels.close}>−</button>
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
        <label className={styles.liveVoiceControl}>
          <span>{labels.voice}</span>
          <select value={voiceId} onChange={(event) => changeVoice(event.target.value)}>
            {BAYBIMAI_VOICES.map((voice) => (
              <option value={voice.id} key={voice.id}>{voice.name}</option>
            ))}
          </select>
        </label>
        <div className={styles.broadcastControls}>
          {state === "idle" ? <button type="button" onClick={start}>{labels.start} ▶</button> : null}
          {state === "idle" ? <button type="button" onClick={preview}>{labels.preview}</button> : null}
          {state === "playing" || state === "paused" ? <button type="button" onClick={togglePause}>{state === "paused" ? labels.resume : labels.pause}</button> : null}
          {state !== "idle" ? <button type="button" onClick={stop}>{labels.stop}</button> : null}
        </div>
        <div className={styles.liveFooter}><span>{labels.schedule}</span><strong>WEEKLY · 08</strong></div>
      </div>
    </aside>
  );
}

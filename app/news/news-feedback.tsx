"use client";

import { FormEvent, useState } from "react";
import type { NewsLang } from "./news-content";
import styles from "./news.module.css";

type Signal = "useful" | "more-examples" | "more-sources";
type Status = "idle" | "sending" | "sent" | "error";

const copy = {
  zh: {
    label: "PRODUCT LOOP",
    title: "下一期，应该继续追踪什么？",
    intro: "不收集个人信息。你的反馈会直接影响下一期的选题与信号筛选。",
    useful: "继续追踪这类信号",
    examples: "想看更具体的项目案例",
    sources: "想看更多一手来源",
    noteLabel: "补充说明（可选）",
    notePlaceholder: "例如：想了解某个地区、工具或项目环节",
    submit: "发送给编辑部",
    sending: "正在发送…",
    sent: "已收到。我们会用它优化下一期。",
    error: "暂时无法发送。请检查网络后重试。",
  },
  en: {
    label: "PRODUCT LOOP",
    title: "What should the next brief track?",
    intro: "No personal information is collected. Your feedback shapes the next story and signal filter.",
    useful: "Keep tracking this signal",
    examples: "Show more concrete project cases",
    sources: "Bring in more primary sources",
    noteLabel: "Add context (optional)",
    notePlaceholder: "A region, tool, or project stage you want covered",
    submit: "Send to the editorial desk",
    sending: "Sending…",
    sent: "Received. It will help improve the next brief.",
    error: "Couldn’t send this right now. Check your connection and try again.",
  },
} as const;

export default function NewsFeedback({
  lang,
  issueDate,
}: {
  lang: NewsLang;
  issueDate: string;
}) {
  const text = copy[lang];
  const [signal, setSignal] = useState<Signal | null>(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signal || status === "sending") return;
    setStatus("sending");

    try {
      const response = await fetch("/api/news/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang, issueDate, signal, note }),
      });
      if (!response.ok) throw new Error("Feedback unavailable");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={styles.feedback} aria-labelledby="news-feedback-title">
      <div className={styles.feedbackIntro}>
        <p>{text.label}</p>
        <h2 id="news-feedback-title">{text.title}</h2>
        <span>{text.intro}</span>
      </div>
      <form className={styles.feedbackForm} onSubmit={submit}>
        <div className={styles.feedbackChoices} role="radiogroup" aria-label={text.title}>
          {(
            [
              ["useful", text.useful],
              ["more-examples", text.examples],
              ["more-sources", text.sources],
            ] as const
          ).map(([value, label]) => (
            <button
              aria-checked={signal === value}
              className={signal === value ? styles.feedbackChoiceActive : ""}
              key={value}
              onClick={() => setSignal(value)}
              role="radio"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <label className={styles.feedbackNote}>
          <span>{text.noteLabel}</span>
          <textarea
            maxLength={500}
            onChange={(event) => setNote(event.target.value)}
            placeholder={text.notePlaceholder}
            value={note}
          />
        </label>
        <button
          className={styles.feedbackSubmit}
          disabled={!signal || status === "sending" || status === "sent"}
          type="submit"
        >
          {status === "sending" ? text.sending : text.submit}
          <span aria-hidden="true">↗</span>
        </button>
        {status === "sent" ? <p className={styles.feedbackStatus} role="status">{text.sent}</p> : null}
        {status === "error" ? <p className={styles.feedbackError} role="alert">{text.error}</p> : null}
      </form>
    </section>
  );
}

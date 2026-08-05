"use client";

import { useState } from "react";
import type { Lang } from "./dictionaries";
import styles from "./news/news.module.css";

type Plan = "monthly" | "yearly";

const copy: Record<Lang, {
  monthly: string;
  yearly: string;
  cta: (plan: Plan) => string;
  loading: string;
  error: string;
}> = {
  zh: {
    monthly: "月度会员",
    yearly: "年度会员",
    cta: (plan) => (plan === "yearly" ? "订阅年度会员" : "订阅月度会员"),
    loading: "正在打开付款页…",
    error: "暂时无法打开付款页，请稍后再试。",
  },
  en: {
    monthly: "Monthly",
    yearly: "Yearly",
    cta: (plan) => (plan === "yearly" ? "Subscribe yearly" : "Subscribe monthly"),
    loading: "Opening checkout…",
    error: "Checkout is unavailable right now — please try again shortly.",
  },
};

export default function SubscribeButton({ lang }: { lang: Lang }) {
  const dict = copy[lang];
  const [plan, setPlan] = useState<Plan>("monthly");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function startCheckout() {
    setStatus("loading");

    try {
      const response = await fetch("/api/stripe/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, plan }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Checkout unavailable");
      }

      window.location.assign(result.url);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.subscribeArea}>
      <div className={styles.planChoices} role="radiogroup" aria-label={lang === "zh" ? "订阅方案" : "Membership plans"}>
        <button
          type="button"
          role="radio"
          aria-checked={plan === "monthly"}
          className={`${styles.planChoice} ${plan === "monthly" ? styles.planChoiceActive : ""}`}
          onClick={() => setPlan("monthly")}
        >
          <span>{dict.monthly}</span>
          <strong>$5.9 <small>{lang === "zh" ? "/ 月" : "/ mo"}</small></strong>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={plan === "yearly"}
          className={`${styles.planChoice} ${styles.yearlyPlan} ${plan === "yearly" ? styles.planChoiceActive : ""}`}
          onClick={() => setPlan("yearly")}
        >
          <span>{dict.yearly}</span>
          <strong>$59 <small>{lang === "zh" ? "/ 年" : "/ yr"}</small></strong>
          <em>{lang === "zh" ? "省 17%" : "SAVE 17%"}</em>
        </button>
      </div>
      <button
        className={styles.subscribeCheckout}
        disabled={status === "loading"}
        onClick={startCheckout}
        type="button"
      >
        <span>{status === "loading" ? dict.loading : dict.cta(plan)}</span>
        <span aria-hidden="true">↗</span>
      </button>
      {status === "error" ? (
        <p className={styles.subscribeError} role="alert">
          {dict.error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "暂时无法提交，请稍后再试。");
      }

      form.reset();
      setState("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "暂时无法提交，请稍后再试。",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p>谢谢，已经收到😊</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        <label>
          <span>姓名（必填）</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            placeholder="您的姓名"
          />
        </label>
        <label>
          <span>邮件（必填）</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
            placeholder="name@company.com"
          />
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        网站
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "提交中…" : "提交"}
        <span aria-hidden="true">→</span>
      </button>

      {state === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

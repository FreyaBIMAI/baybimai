"use client";

import { FormEvent, useState } from "react";
import { dictionaries, type Lang } from "./dictionaries";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
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
        throw new Error(result.error ?? dict.form.defaultError);
      }

      form.reset();
      setState("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : dict.form.defaultError,
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p>{dict.form.successMessage}</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        <label>
          <span>{dict.form.nameLabel}</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            placeholder={dict.form.namePlaceholder}
          />
        </label>
        <label>
          <span>{dict.form.emailLabel}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
            placeholder={dict.form.emailPlaceholder}
          />
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        {dict.form.honeypotLabel}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? dict.form.submitting : dict.form.submit}
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

"use client";

import { useState } from "react";
import { useLanguage } from "./language-context";

export default function PurchaseButton() {
  const { dict } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function startCheckout() {
    setStatus("loading");

    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Checkout unavailable");
      }

      window.location.assign(result.url);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="purchase-area">
      <button
        className="purchase-button"
        disabled={status === "loading"}
        onClick={startCheckout}
        type="button"
      >
        <span>{status === "loading" ? dict.purchase.loading : dict.purchase.cta}</span>
        <span aria-hidden="true">↗</span>
      </button>
      {status === "error" ? (
        <p className="purchase-error" role="alert">
          {dict.purchase.error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function PurchaseButton() {
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
        <span>{status === "loading" ? "正在打开付款页…" : "立即购买"}</span>
        <span aria-hidden="true">↗</span>
      </button>
      {status === "error" ? (
        <p className="purchase-error" role="alert">
          暂时无法打开付款页，请稍后再试。
        </p>
      ) : null}
    </div>
  );
}

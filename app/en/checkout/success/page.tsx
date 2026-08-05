import type { Metadata } from "next";
import Link from "next/link";
import SetHtmlLang from "../../set-html-lang";

export const metadata: Metadata = {
  title: "Payment Received — BAYBIMAI",
  description: "Your Revit Fast-Start Course payment has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EnglishCheckoutSuccessPage() {
  return (
    <>
      <SetHtmlLang lang="en" />
      <main className="checkout-result">
        <section className="checkout-result-card">
          <p className="eyebrow checkout-eyebrow">
            <span />
            PAYMENT RECEIVED
          </p>
          <div className="success-mark" aria-hidden="true">
            ✓
          </div>
          <h1>Thank you. We’ve received your payment.</h1>
          <p>
            Stripe is confirming the payment. Once complete, we’ll send access
            instructions to your payment email.
          </p>
          <Link className="return-link" href="/en">
            Return to BAYBIMAI
          </Link>
        </section>
      </main>
    </>
  );
}

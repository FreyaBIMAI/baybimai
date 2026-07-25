import { env } from "cloudflare:workers";
import Stripe from "stripe";

type StripeBindings = {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_PRICE_ID?: string;
  STRIPE_PRODUCT_ID?: string;
  SITE_URL?: string;
};

function bindings(): StripeBindings {
  return env as unknown as StripeBindings;
}

export function getStripe() {
  const secretKey = bindings().STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export function getStripeConfig() {
  const current = bindings();

  if (!current.STRIPE_PRICE_ID || !current.STRIPE_PRODUCT_ID) {
    throw new Error("Stripe product configuration is incomplete.");
  }

  return {
    priceId: current.STRIPE_PRICE_ID,
    productId: current.STRIPE_PRODUCT_ID,
    siteUrl: (current.SITE_URL || "https://baybimai.org").replace(/\/+$/, ""),
    webhookSecret: current.STRIPE_WEBHOOK_SECRET,
  };
}

export const stripeCryptoProvider = Stripe.createSubtleCryptoProvider();

import type Stripe from "stripe";
import { getDb } from "../../../../db";
import { orders } from "../../../../db/schema";
import {
  getStripe,
  getStripeConfig,
  stripeCryptoProvider,
} from "../../../../lib/stripe";

async function recordPaidOrder(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    return;
  }

  const { priceId, productId } = getStripeConfig();
  const fulfilledAt = new Date().toISOString();

  await getDb()
    .insert(orders)
    .values({
      stripeSessionId: session.id,
      customerEmail:
        session.customer_details?.email ?? session.customer_email ?? null,
      productId: session.metadata?.productId ?? productId,
      priceId: session.metadata?.priceId ?? priceId,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
      paymentStatus: session.payment_status,
      fulfilledAt,
    })
    .onConflictDoUpdate({
      target: orders.stripeSessionId,
      set: {
        customerEmail:
          session.customer_details?.email ?? session.customer_email ?? null,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        paymentStatus: session.payment_status,
        fulfilledAt,
      },
    });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const { webhookSecret } = getStripeConfig();

  if (!signature || !webhookSecret) {
    return Response.json(
      { error: "Stripe webhook is not configured." },
      { status: 400 },
    );
  }

  try {
    const rawBody = await request.text();
    const event = await getStripe().webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
      undefined,
      stripeCryptoProvider,
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await recordPaidOrder(event.data.object);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook verification failed", error);
    return Response.json({ error: "Invalid webhook." }, { status: 400 });
  }
}

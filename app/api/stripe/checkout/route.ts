import { getStripe, getStripeConfig } from "../../../../lib/stripe";

export async function POST() {
  try {
    const stripe = getStripe();
    const { priceId, productId, siteUrl } = getStripeConfig();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_creation: "always",
      locale: "zh",
      metadata: {
        course: "revit-lightning-course",
        productId,
        priceId,
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#courses`,
    });

    if (!session.url) {
      throw new Error("Stripe Checkout did not return a URL.");
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout Session", error);
    return Response.json(
      { error: "暂时无法进入付款页面，请稍后再试。" },
      { status: 500 },
    );
  }
}

import { getStripe, getStripeConfig } from "../../../../lib/stripe";

type CheckoutLanguage = "zh" | "en";

async function readLanguage(request: Request): Promise<CheckoutLanguage> {
  try {
    const body = (await request.json()) as { lang?: unknown };
    return body.lang === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

export async function POST(request: Request) {
  const lang = await readLanguage(request);

  try {
    const stripe = getStripe();
    const { priceId, productId, siteUrl } = getStripeConfig();
    const pagePath = lang === "en" ? "/en" : "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_creation: "always",
      locale: lang,
      metadata: {
        course: "revit-lightning-course",
        lang,
        productId,
        priceId,
      },
      success_url: `${siteUrl}${pagePath}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${pagePath}/#courses`,
    });

    if (!session.url) {
      throw new Error("Stripe Checkout did not return a URL.");
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout Session", error);
    return Response.json(
      {
        error:
          lang === "en"
            ? "Checkout is unavailable right now. Please try again shortly."
            : "暂时无法进入付款页面，请稍后再试。",
      },
      { status: 500 },
    );
  }
}

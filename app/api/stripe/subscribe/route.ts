import { getStripe, getNewsSubscriptionConfig } from "../../../../lib/stripe";

type CheckoutLanguage = "zh" | "en";
type Plan = "monthly" | "yearly";

async function readBody(request: Request): Promise<{ lang: CheckoutLanguage; plan: Plan }> {
  try {
    const body = (await request.json()) as { lang?: unknown; plan?: unknown };
    return {
      lang: body.lang === "en" ? "en" : "zh",
      plan: body.plan === "yearly" ? "yearly" : "monthly",
    };
  } catch {
    return { lang: "zh", plan: "monthly" };
  }
}

export async function POST(request: Request) {
  const { lang, plan } = await readBody(request);

  try {
    const stripe = getStripe();
    const { monthlyPriceId, yearlyPriceId, siteUrl } = getNewsSubscriptionConfig();
    const priceId = plan === "yearly" ? yearlyPriceId : monthlyPriceId;
    const pagePath = lang === "en" ? "/en" : "";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      locale: lang,
      metadata: {
        product: "news-membership",
        plan,
        lang,
        priceId,
      },
      success_url: `${siteUrl}${pagePath}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${pagePath}/news/subscribe`,
    });

    if (!session.url) {
      throw new Error("Stripe Checkout did not return a URL.");
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create news membership Checkout Session", error);
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

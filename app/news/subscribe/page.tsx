import type { Metadata } from "next";
import SubscribeView from "../../news/subscribe-view";

export const metadata: Metadata = {
  title: "Subscribe to Daily BIM Intelligence | BAYBIMAI",
  description: "A daily BIM headline and signal roundup. $5.9 monthly or $59 yearly.",
  alternates: {
    canonical: "/news/subscribe",
    languages: {
      "zh-CN": "/zh/news/subscribe",
      en: "/news/subscribe",
    },
  },
};

export default function EnglishNewsSubscribePage() {
  return <SubscribeView lang="en" />;
}

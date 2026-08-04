import type { Metadata } from "next";
import DailyPage from "../../daily/daily-page";
import SetHtmlLang from "../set-html-lang";

export const metadata: Metadata = {
  title: "Founder Daily: Six-Minute Founder English | BAYBIMAI",
  description: "A 28-day English sprint for founders: read, listen, speak, and write about positioning, sales, fundraising, and leadership.",
  alternates: {
    canonical: "https://baybimai.org/en/daily",
    languages: {
      "zh-CN": "https://baybimai.org/daily",
      en: "https://baybimai.org/en/daily",
      "x-default": "https://baybimai.org/daily",
    },
  },
  openGraph: {
    title: "Founder Daily | BAYBIMAI",
    description: "Read. Listen. Say. Write. Six minutes a day.",
    url: "https://baybimai.org/en/daily",
    siteName: "BAYBIMAI",
    images: [{ url: "/daily-og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Daily | BAYBIMAI",
    description: "Build founder English into muscle memory.",
    images: ["/daily-og.png"],
  },
};

export default function EnglishDailyPage() {
  return <><SetHtmlLang lang="en" /><DailyPage lang="en" /></>;
}

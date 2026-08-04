import type { Metadata } from "next";
import DailyPage from "./daily-page";

export const metadata: Metadata = {
  title: "Founder Daily：每天 6 分钟创业英语 | BAYBIMAI",
  description: "28 天创业英语晨读：读英文、听朗读、说一句、写两句，训练销售、融资和创始人表达。",
  alternates: {
    canonical: "https://baybimai.org/daily",
    languages: {
      "zh-CN": "https://baybimai.org/daily",
      en: "https://baybimai.org/en/daily",
      "x-default": "https://baybimai.org/daily",
    },
  },
  openGraph: {
    title: "Founder Daily | BAYBIMAI",
    description: "每天 6 分钟，把创业英语变成肌肉记忆。",
    url: "https://baybimai.org/daily",
    siteName: "BAYBIMAI",
    images: [{ url: "/daily-og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Daily | BAYBIMAI",
    description: "Read. Listen. Say. Write. Six minutes a day.",
    images: ["/daily-og.png"],
  },
};

export default function Page() {
  return <DailyPage lang="zh" />;
}

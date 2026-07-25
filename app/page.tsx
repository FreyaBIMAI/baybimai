import type { Metadata } from "next";
import HomeView from "./home-view";

export const metadata: Metadata = {
  title: "BAYBIMAI — 把 BIM 学到真正能用",
  description:
    "面向个人的 BIM 实战课程包，面向企业的定制培训与 BIM 审计服务。",
  alternates: {
    canonical: "https://baybimai.org/",
    languages: {
      "zh-CN": "https://baybimai.org/",
      en: "https://baybimai.org/en",
      "x-default": "https://baybimai.org/",
    },
  },
  openGraph: {
    title: "BAYBIMAI",
    description: "课程包 · 企业培训 · BIM 审计",
    url: "https://baybimai.org/",
    siteName: "BAYBIMAI",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAYBIMAI",
    description: "把 BIM 学到真正能用。",
    images: ["/og-v2.png"],
  },
};

export default function Page() {
  return <HomeView lang="zh" />;
}

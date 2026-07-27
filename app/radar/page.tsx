import type { Metadata } from "next";
import RadarPage from "./radar-page";

export const metadata: Metadata = {
  title: "全球 BIM 雷达：活动、IFC、项目、论文与人物 | BAYBIMAI",
  description:
    "追踪湾区与全球 AEC/BIM 活动、openBIM 与 IFC 标准、瑞士瑞典芬兰项目进展、研究论文和长期建设者路径。",
  alternates: {
    canonical: "https://baybimai.org/radar",
    languages: {
      "zh-CN": "https://baybimai.org/radar",
      en: "https://baybimai.org/en/radar",
      "x-default": "https://baybimai.org/radar",
    },
  },
  openGraph: {
    title: "全球 BIM 雷达 | BAYBIMAI",
    description: "活动 · openBIM 标准 · 区域项目 · 论文 · 人物路径",
    url: "https://baybimai.org/radar",
    siteName: "BAYBIMAI",
    images: [{ url: "/radar-og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "全球 BIM 雷达 | BAYBIMAI",
    description: "活动、标准、项目、论文与长期建设者路径。",
    images: ["/radar-og.png"],
  },
};

export default function Page() {
  return <RadarPage lang="zh" />;
}


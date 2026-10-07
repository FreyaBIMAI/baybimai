import type { Metadata } from "next";
import NewsIndex from "../../news/news-index";

export const metadata: Metadata = {
  title: "BIM 新闻与施工科技深度报告 | BAYBIMAI",
  description:
    "BAYBIMAI 追踪真正影响 BIM、VDC、造价、项目控制与职业发展的施工科技变化。",
  alternates: {
    canonical: "/zh/news",
    languages: {
      "zh-CN": "/zh/news",
      en: "/news",
    },
  },
};

export default function NewsPage() {
  return <NewsIndex lang="zh" />;
}

import type { Metadata } from "next";
import NewsArticle from "../news-article";
import { ARTICLE_SLUG } from "../news-content";

export const metadata: Metadata = {
  title: "施工 AI 开始执行企业流程 | BAYBIMAI 深度报告",
  description:
    "解读 Procore Digital Coworker、Trimble AI Takeoff 与 Autodesk Forma 对 BIM/VDC、造价、项目控制和求职方向的影响。",
  alternates: {
    canonical: `/news/${ARTICLE_SLUG}`,
    languages: {
      "zh-CN": `/news/${ARTICLE_SLUG}`,
      en: `/en/news/${ARTICLE_SLUG}`,
    },
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-07-27",
  },
};

export default function ArticlePage() {
  return <NewsArticle lang="zh" />;
}

import type { Metadata } from "next";
import NewsArticle from "../news-article";
import { ARTICLE_SLUG } from "../news-content";

export const metadata: Metadata = {
  title: "本周施工 AI：Forma、Procore 与 Trimble | BAYBIMAI",
  description:
    "截至 2026 年 8 月 5 日的 BIM、VDC、造价与施工 AI 周报，解读 Autodesk Forma、Procore 与 Trimble 的最新动作。",
  alternates: {
    canonical: `/news/${ARTICLE_SLUG}`,
    languages: {
      "zh-CN": `/news/${ARTICLE_SLUG}`,
      en: `/en/news/${ARTICLE_SLUG}`,
    },
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-08-05",
    modifiedTime: "2026-08-05",
  },
};

export default function ArticlePage() {
  return <NewsArticle lang="zh" />;
}

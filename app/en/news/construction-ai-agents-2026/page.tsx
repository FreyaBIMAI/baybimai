import type { Metadata } from "next";
import NewsArticle from "../../../news/news-article";
import { ARTICLE_SLUG } from "../../../news/news-content";

export const metadata: Metadata = {
  title: "Construction AI Starts Executing Company Workflows | BAYBIMAI",
  description:
    "What Procore Digital Coworker, Trimble AI Takeoff, and Autodesk Forma mean for BIM/VDC, cost, project controls, and careers.",
  alternates: {
    canonical: `/en/news/${ARTICLE_SLUG}`,
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

export default function EnglishArticlePage() {
  return <NewsArticle lang="en" />;
}

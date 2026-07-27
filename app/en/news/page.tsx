import type { Metadata } from "next";
import NewsIndex from "../../news/news-index";

export const metadata: Metadata = {
  title: "BIM News & Construction Technology Reports | BAYBIMAI",
  description:
    "BAYBIMAI tracks construction technology shifts that matter to BIM, VDC, estimating, project controls, and careers.",
  alternates: {
    canonical: "/en/news",
    languages: {
      "zh-CN": "/news",
      en: "/en/news",
    },
  },
};

export default function EnglishNewsPage() {
  return <NewsIndex lang="en" />;
}

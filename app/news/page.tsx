import type { Metadata } from "next";
import NewsIndex from "./news-index";

export const metadata: Metadata = {
  title: "BIM News & Construction Technology Reports | BAYBIMAI",
  description:
    "BAYBIMAI tracks construction technology shifts that matter to BIM, VDC, estimating, project controls, and careers.",
  alternates: {
    canonical: "/news",
    languages: {
      "zh-CN": "/zh/news",
      en: "/news",
    },
  },
};

export default function EnglishNewsPage() {
  return <NewsIndex lang="en" />;
}

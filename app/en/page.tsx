import type { Metadata } from "next";
import HomeView from "../home-view";
import SetHtmlLang from "./set-html-lang";

export const metadata: Metadata = {
  title: "BAYBIMAI — Learn BIM, Put It to Real Work",
  description:
    "Hands-on Revit courses for individuals, tailored enterprise BIM training, and independent BIM audits.",
  alternates: {
    canonical: "https://baybimai.org/en",
    languages: {
      "zh-CN": "https://baybimai.org/",
      en: "https://baybimai.org/en",
      "x-default": "https://baybimai.org/",
    },
  },
  openGraph: {
    title: "BAYBIMAI",
    description: "Courses · Enterprise Training · BIM Consulting",
    url: "https://baybimai.org/en",
    siteName: "BAYBIMAI",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAYBIMAI",
    description: "Learn BIM, put it to real work.",
    images: ["/og-v2.png"],
  },
};

export default function EnglishPage() {
  return (
    <>
      <SetHtmlLang lang="en" />
      <HomeView lang="en" />
    </>
  );
}

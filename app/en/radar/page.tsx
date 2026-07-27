import type { Metadata } from "next";
import RadarPage from "../../radar/radar-page";
import SetHtmlLang from "../set-html-lang";

export const metadata: Metadata = {
  title: "Global BIM Radar: Events, IFC, Projects & Research | BAYBIMAI",
  description:
    "Track Bay Area and global AEC/BIM events, openBIM standards, Swiss and Nordic delivery programs, research papers, and long-term builder paths.",
  alternates: {
    canonical: "https://baybimai.org/en/radar",
    languages: {
      "zh-CN": "https://baybimai.org/radar",
      en: "https://baybimai.org/en/radar",
      "x-default": "https://baybimai.org/radar",
    },
  },
  openGraph: {
    title: "Global BIM Radar | BAYBIMAI",
    description:
      "Events · openBIM standards · Regional programs · Research · Builder paths",
    url: "https://baybimai.org/en/radar",
    siteName: "BAYBIMAI",
    images: [{ url: "/radar-og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global BIM Radar | BAYBIMAI",
    description:
      "Events, standards, projects, research, and long-term builder paths.",
    images: ["/radar-og.png"],
  },
};

export default function EnglishRadarPage() {
  return (
    <>
      <SetHtmlLang lang="en" />
      <RadarPage lang="en" />
    </>
  );
}


import type { Metadata } from "next";
import RadarPage from "./radar-page";

export const metadata: Metadata = {
  title: "Global BIM Radar: Events, IFC, Projects & Research | BAYBIMAI",
  description:
    "Track Bay Area and global AEC/BIM events, openBIM standards, Swiss and Nordic delivery programs, research papers, and long-term builder paths.",
  alternates: {
    canonical: "https://baybimai.org/radar",
    languages: {
      "zh-CN": "https://baybimai.org/zh/radar",
      en: "https://baybimai.org/radar",
      "x-default": "https://baybimai.org/radar",
    },
  },
  openGraph: {
    title: "Global BIM Radar | BAYBIMAI",
    description:
      "Events · openBIM standards · Regional programs · Research · Builder paths",
    url: "https://baybimai.org/radar",
    siteName: "BAYBIMAI",
    images: [{ url: "/zh/radar-og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global BIM Radar | BAYBIMAI",
    description:
      "Events, standards, projects, research, and long-term builder paths.",
    images: ["/zh/radar-og.png"],
  },
};

export default function EnglishRadarPage() {
  return (
    <>
      <RadarPage lang="en" />
    </>
  );
}


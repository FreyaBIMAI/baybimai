import type { Metadata } from "next";
import CareersPage from "../../careers/careers-page";
import SetHtmlLang from "../set-html-lang";

export const metadata: Metadata = {
  title: "Bay Area AEC Firms & BIM Interview Prep | BAYBIMAI",
  description:
    "Compare major Bay Area AEC firms, open official career pages, and prepare for BIM, VDC, and digital-delivery interviews.",
  alternates: {
    canonical: "https://baybimai.org/en/careers",
    languages: {
      "zh-CN": "https://baybimai.org/careers",
      en: "https://baybimai.org/en/careers",
      "x-default": "https://baybimai.org/careers",
    },
  },
  openGraph: {
    title: "Bay Area AEC Firms & BIM Interview Prep",
    description:
      "Company scale signals · Official careers · A 7-day interview plan",
    url: "https://baybimai.org/en/careers",
    siteName: "BAYBIMAI",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
};

export default function EnglishCareersPage() {
  return (
    <>
      <SetHtmlLang lang="en" />
      <CareersPage lang="en" />
    </>
  );
}

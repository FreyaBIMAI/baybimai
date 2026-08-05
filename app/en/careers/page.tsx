import type { Metadata } from "next";
import CareersPage from "../../careers/careers-page";
import SetHtmlLang from "../set-html-lang";
import { requireOwner } from "../../owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | BAYBIMAI",
  description:
    "Compare major Bay Area AEC firms, open official career pages, and prepare for BIM, VDC, and digital-delivery interviews.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EnglishCareersPage() {
  await requireOwner("/en/careers");
  return (
    <>
      <SetHtmlLang lang="en" />
      <CareersPage lang="en" />
    </>
  );
}

import type { Metadata } from "next";
import CareersPage from "./careers-page";
import { requireOwner } from "../owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | BAYBIMAI",
  description:
    "Compare major Bay Area AEC firms, open official career pages, and prepare for BIM, VDC, and digital-delivery interviews.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EnglishCareersPage() {
  await requireOwner("/careers");
  return (
    <>
      <CareersPage lang="en" />
    </>
  );
}

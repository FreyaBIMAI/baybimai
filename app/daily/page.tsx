import type { Metadata } from "next";
import DailyPage from "./daily-page";
import { requireOwner } from "../owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Founder Daily | BAYBIMAI",
  description: "A 56-day English sprint for founders: read, listen, speak, and write about positioning, sales, fundraising, leadership, and reading the AI/BIM market.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EnglishDailyPage() {
  await requireOwner("/daily");
  return <DailyPage lang="en" />;
}

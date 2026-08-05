import type { Metadata } from "next";
import DailyPage from "../../daily/daily-page";
import SetHtmlLang from "../set-html-lang";
import { requireOwner } from "../../owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Founder Daily | BAYBIMAI",
  description: "A 28-day English sprint for founders: read, listen, speak, and write about positioning, sales, fundraising, and leadership.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EnglishDailyPage() {
  await requireOwner("/en/daily");
  return <><SetHtmlLang lang="en" /><DailyPage lang="en" /></>;
}

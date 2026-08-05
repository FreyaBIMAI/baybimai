import type { Metadata } from "next";
import DailyPage from "./daily-page";
import { requireOwner } from "../owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Founder Daily | BAYBIMAI",
  description: "28 天创业英语晨读：读英文、听朗读、说一句、写两句，训练销售、融资和创始人表达。",
  robots: { index: false, follow: false, nocache: true },
};

export default async function Page() {
  await requireOwner("/daily");
  return <DailyPage lang="zh" />;
}

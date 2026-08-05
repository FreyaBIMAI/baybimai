import type { Metadata } from "next";
import CareersPage from "./careers-page";
import { requireOwner } from "../owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | BAYBIMAI",
  description:
    "湾区 AEC 公司规模榜单、官方招聘入口，以及 BIM、VDC、数字交付岗位的 HR 与技术面试准备资源。",
  robots: { index: false, follow: false, nocache: true },
};

export default async function Page() {
  await requireOwner("/careers");
  return <CareersPage lang="zh" />;
}

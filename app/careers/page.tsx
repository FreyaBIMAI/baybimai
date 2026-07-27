import type { Metadata } from "next";
import CareersPage from "./careers-page";

export const metadata: Metadata = {
  title: "湾区 AEC 公司与 BIM 面试准备 | BAYBIMAI",
  description:
    "湾区 AEC 公司规模榜单、官方招聘入口，以及 BIM、VDC、数字交付岗位的 HR 与技术面试准备资源。",
  alternates: {
    canonical: "https://baybimai.org/careers",
    languages: {
      "zh-CN": "https://baybimai.org/careers",
      en: "https://baybimai.org/en/careers",
      "x-default": "https://baybimai.org/careers",
    },
  },
  openGraph: {
    title: "湾区 AEC 公司与 BIM 面试准备",
    description: "公司规模信号 · 官方招聘入口 · 7 天面试准备计划",
    url: "https://baybimai.org/careers",
    siteName: "BAYBIMAI",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    type: "website",
    locale: "zh_CN",
  },
};

export default function Page() {
  return <CareersPage lang="zh" />;
}

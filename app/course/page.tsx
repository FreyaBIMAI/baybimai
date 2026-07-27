import type { Metadata } from "next";
import ServiceDetailView from "../service-detail-view";
import PurchaseButton from "../purchase-button";

export const metadata: Metadata = {
  title: "Revit 闪电入门课 | BAYBIMAI",
  description:
    "面向零基础学习者，用最短路径掌握 Revit 基础建模与常用工作流程。$59 一次性购买，永久访问。",
  alternates: {
    canonical: "https://baybimai.org/course",
    languages: {
      "zh-CN": "https://baybimai.org/course",
      en: "https://baybimai.org/en/course",
      "x-default": "https://baybimai.org/course",
    },
  },
};

export default function CoursePage() {
  return (
    <ServiceDetailView
      lang="zh"
      service="course"
      cta={<PurchaseButton lang="zh" />}
    />
  );
}

import type { Metadata } from "next";
import ServiceDetailView from "../service-detail-view";
import ContactForm from "../contact-form";

export const metadata: Metadata = {
  title: "BIM 审计 | BAYBIMAI",
  description:
    "独立检查模型质量、标准执行与交付完整性，提前识别影响协同和验收的问题。",
  alternates: {
    canonical: "https://baybimai.org/audit",
    languages: {
      "zh-CN": "https://baybimai.org/audit",
      en: "https://baybimai.org/en/audit",
      "x-default": "https://baybimai.org/audit",
    },
  },
};

export default function AuditPage() {
  return (
    <ServiceDetailView
      lang="zh"
      service="audit"
      cta={<ContactForm lang="zh" />}
    />
  );
}

import type { Metadata } from "next";
import ServiceDetailView from "../service-detail-view";
import ContactForm from "../contact-form";

export const metadata: Metadata = {
  title: "企业 BIM 培训 | BAYBIMAI",
  description:
    "围绕团队现状、项目类型和交付目标定制课程，让培训直接服务于正在发生的项目。",
  alternates: {
    canonical: "https://baybimai.org/training",
    languages: {
      "zh-CN": "https://baybimai.org/training",
      en: "https://baybimai.org/en/training",
      "x-default": "https://baybimai.org/training",
    },
  },
};

export default function TrainingPage() {
  return (
    <ServiceDetailView
      lang="zh"
      service="training"
      cta={<ContactForm lang="zh" />}
    />
  );
}

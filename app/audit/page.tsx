import type { Metadata } from "next";
import ServiceDetailView from "../service-detail-view";
import ContactForm from "../contact-form";

export const metadata: Metadata = {
  title: "BIM Consulting | BAYBIMAI",
  description:
    "An independent check of model quality, standards compliance, and delivery completeness — catching issues before they affect coordination or sign-off.",
  alternates: {
    canonical: "https://baybimai.org/audit",
    languages: {
      "zh-CN": "https://baybimai.org/zh/audit",
      en: "https://baybimai.org/audit",
      "x-default": "https://baybimai.org/audit",
    },
  },
};

export default function AuditPageEn() {
  return (
    <ServiceDetailView
      lang="en"
      service="audit"
      cta={<ContactForm lang="en" />}
    />
  );
}

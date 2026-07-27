import type { Metadata } from "next";
import ServiceDetailView from "../../service-detail-view";
import ContactForm from "../../contact-form";

export const metadata: Metadata = {
  title: "Enterprise BIM Training | BAYBIMAI",
  description:
    "Curriculum built around your team's current tools, project types, and delivery goals — training that serves the work already underway.",
  alternates: {
    canonical: "https://baybimai.org/en/training",
    languages: {
      "zh-CN": "https://baybimai.org/training",
      en: "https://baybimai.org/en/training",
      "x-default": "https://baybimai.org/training",
    },
  },
};

export default function TrainingPageEn() {
  return (
    <ServiceDetailView
      lang="en"
      service="training"
      cta={<ContactForm lang="en" />}
    />
  );
}

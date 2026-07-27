import type { Metadata } from "next";
import ServiceDetailView from "../../service-detail-view";
import PurchaseButton from "../../purchase-button";

export const metadata: Metadata = {
  title: "Revit Fast-Start Course | BAYBIMAI",
  description:
    "For complete beginners — get fluent in core Revit modeling and everyday workflows. $59 one-time purchase, lifetime access.",
  alternates: {
    canonical: "https://baybimai.org/en/course",
    languages: {
      "zh-CN": "https://baybimai.org/course",
      en: "https://baybimai.org/en/course",
      "x-default": "https://baybimai.org/course",
    },
  },
};

export default function CoursePageEn() {
  return (
    <ServiceDetailView
      lang="en"
      service="course"
      cta={<PurchaseButton lang="en" />}
    />
  );
}

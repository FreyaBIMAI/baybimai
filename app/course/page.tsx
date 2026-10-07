import type { Metadata } from "next";
import CourseCatalog from "../course-catalog";

export const metadata: Metadata = {
  title: "BIM Learning Path: Foundation, Advanced & Expansion | BAYBIMAI",
  description:
    "A staged BIM curriculum: 7-Day Revit Fast-Start, Revit Families, BIM Project Presentation, and Dynamo Fundamentals.",
  alternates: {
    canonical: "https://baybimai.org/course",
    languages: {
      "zh-CN": "https://baybimai.org/zh/course",
      en: "https://baybimai.org/course",
      "x-default": "https://baybimai.org/course",
    },
  },
};

export default function CoursePageEn() {
  return <CourseCatalog lang="en" />;
}

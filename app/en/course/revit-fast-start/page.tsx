import type { Metadata } from "next";
import CourseRevitFastStartView from "../../../course-revit-fast-start-view";

export const metadata: Metadata = {
  title: "7-Day Revit Fast-Start · Full Syllabus | BAYBIMAI",
  description:
    "61 core lessons plus 2 bonus lessons, about 15.5 hours of video, from zero to independently modeling, coordinating, and producing sheets for a real project. View the full syllabus.",
  alternates: {
    canonical: "https://baybimai.org/en/course/revit-fast-start",
    languages: {
      "zh-CN": "https://baybimai.org/course/revit-fast-start",
      en: "https://baybimai.org/en/course/revit-fast-start",
      "x-default": "https://baybimai.org/course/revit-fast-start",
    },
  },
};

export default function CourseRevitFastStartPageEn() {
  return <CourseRevitFastStartView lang="en" />;
}

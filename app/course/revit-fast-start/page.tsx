import type { Metadata } from "next";
import CourseRevitFastStartView from "../../course-revit-fast-start-view";

export const metadata: Metadata = {
  title: "7 天 Revit 闪电入门课 · 完整大纲 | BAYBIMAI",
  description:
    "61 讲正课 + 2 讲加餐，约 15.5 小时视频，从零基础到独立完成一个项目的建模、协作与出图。查看完整课程大纲。",
  alternates: {
    canonical: "https://baybimai.org/course/revit-fast-start",
    languages: {
      "zh-CN": "https://baybimai.org/course/revit-fast-start",
      en: "https://baybimai.org/en/course/revit-fast-start",
      "x-default": "https://baybimai.org/course/revit-fast-start",
    },
  },
};

export default function CourseRevitFastStartPage() {
  return <CourseRevitFastStartView lang="zh" />;
}

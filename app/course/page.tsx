import type { Metadata } from "next";
import CourseCatalog from "../course-catalog";

export const metadata: Metadata = {
  title: "BIM 课程路径：入门、进阶与拓展 | BAYBIMAI",
  description:
    "从 7 天 Revit 闪电入门，到 Revit 族、BIM 项目 PPT Presentation 与 Dynamo 入门的分阶段课程路径。",
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
  return <CourseCatalog lang="zh" />;
}

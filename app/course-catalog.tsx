import Link from "next/link";
import PurchaseButton from "./purchase-button";
import Reveal from "./reveal";
import { SiteFooter, SiteNav } from "./site-chrome";
import type { Lang } from "./dictionaries";
import styles from "./course.module.css";

type Course = {
  title: string;
  summary: string;
  meta: string;
  state?: "available" | "comingSoon";
  syllabusHref?: string;
};

type CourseGroup = {
  number: string;
  label: string;
  title: string;
  description: string;
  courses: Course[];
};

const groupAnchors = ["foundation", "advanced", "expansion"] as const;

const catalog: Record<Lang, {
  eyebrow: string;
  title: string;
  intro: string;
  back: string;
  groups: CourseGroup[];
  available: string;
  comingSoon: string;
  browseNews: string;
  viewSyllabus: string;
}> = {
  zh: {
    eyebrow: "BAYBIMAI LEARNING PATH",
    title: "从第一天上手，到把 BIM 变成你的工作系统。",
    intro: "按能力阶段选择课程：先建立建模基础，再用参数化和族库提升交付质量，最后把表达和自动化接进项目协作。",
    back: "返回首页",
    groups: [
      {
        number: "01",
        label: "FOUNDATION",
        title: "入门课程",
        description: "为零基础学习者建立可立即用于项目的 Revit 工作方法。",
        courses: [
          {
            title: "7 天 Revit 闪电入门课",
            summary: "7 天建立界面、建模、视图、出图与协同的完整起点；每一步都对应真实工作场景。",
            meta: "$59 · 一次性购买 · 永久访问",
            state: "available",
            syllabusHref: "/course/revit-fast-start",
          },
        ],
      },
      {
        number: "02",
        label: "ADVANCED",
        title: "进阶课程",
        description: "把重复操作沉淀为更稳定、可复用的模型能力。",
        courses: [
          {
            title: "Revit 族：参数化与族库管理",
            summary: "理解族的结构、参数与类型体系，建立适用于项目交付与团队协作的可维护族库。",
            meta: "课程筹备中",
            state: "comingSoon",
          },
        ],
      },
      {
        number: "03",
        label: "EXPANSION",
        title: "拓展课程",
        description: "让 BIM 成果在沟通、汇报与自动化工作流中继续产生价值。",
        courses: [
          {
            title: "BIM 项目 PPT Presentation",
            summary: "把模型、数据与项目判断整理为清晰、有说服力的项目汇报，而不只是截图集合。",
            meta: "课程筹备中",
            state: "comingSoon",
          },
          {
            title: "Dynamo 入门",
            summary: "用可理解的可视化逻辑自动化重复任务，建立通往参数化工作流的第一步。",
            meta: "课程筹备中",
            state: "comingSoon",
          },
        ],
      },
    ],
    available: "立即开始",
    comingSoon: "即将上线",
    browseNews: "查看本周 HOTSPOT",
    viewSyllabus: "查看完整大纲",
  },
  en: {
    eyebrow: "BAYBIMAI LEARNING PATH",
    title: "Start with real BIM work. Build toward a system you can own.",
    intro: "Choose a stage, not a random feature: build a solid Revit foundation first, then deepen your parametric and family-library practice, and finally connect BIM to communication and automation.",
    back: "Back to home",
    groups: [
      {
        number: "01",
        label: "FOUNDATION",
        title: "Foundation courses",
        description: "A practical Revit starting point for people who are new to BIM.",
        courses: [
          {
            title: "7-Day Revit Fast-Start",
            summary: "Build your first complete workflow in seven days: interface, modeling, views, sheets, and coordination — grounded in real project situations.",
            meta: "$59 · one-time purchase · lifetime access",
            state: "available",
            syllabusHref: "/en/course/revit-fast-start",
          },
        ],
      },
      {
        number: "02",
        label: "ADVANCED",
        title: "Advanced courses",
        description: "Turn repeatable work into dependable, reusable model capability.",
        courses: [
          {
            title: "Revit Families: Parameters & Library Management",
            summary: "Learn family structure, parameters, types, and maintainable libraries that support delivery standards and team collaboration.",
            meta: "In development",
            state: "comingSoon",
          },
        ],
      },
      {
        number: "03",
        label: "EXPANSION",
        title: "Expansion courses",
        description: "Extend BIM outcomes into clear project communication and useful automation.",
        courses: [
          {
            title: "BIM Project PPT Presentation",
            summary: "Shape model views, data, and project judgment into a persuasive project presentation — not a folder of screenshots.",
            meta: "In development",
            state: "comingSoon",
          },
          {
            title: "Dynamo Fundamentals",
            summary: "Use understandable visual logic to automate repetitive work and take the first step into a parametric workflow.",
            meta: "In development",
            state: "comingSoon",
          },
        ],
      },
    ],
    available: "Start learning",
    comingSoon: "Coming soon",
    browseNews: "Explore this week's HOTSPOT",
    viewSyllabus: "View full syllabus",
  },
};

export default function CourseCatalog({ lang }: { lang: Lang }) {
  const copy = catalog[lang];
  const homeHref = lang === "zh" ? "/" : "/en";
  const newsHref = lang === "zh" ? "/news" : "/en/news";

  return (
    <>
      <a className="skip-link" href="#course-catalog">{lang === "zh" ? "跳到主要内容" : "Skip to main content"}</a>
      <main id="course-catalog" tabIndex={-1} className={styles.page}>
        <SiteNav lang={lang} active="course" />

        <section className={styles.hero}>
          <Reveal>
            <Link className={styles.back} href={homeHref}>
              <span aria-hidden="true">←</span>
              {copy.back}
            </Link>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </Reveal>
        </section>

        <section className={styles.groups} aria-label={lang === "zh" ? "课程分类" : "Course categories"}>
          {copy.groups.map((group, groupIndex) => (
            <Reveal delay={groupIndex * 70} key={group.number}>
              <section
                className={styles.group}
                id={groupAnchors[groupIndex]}
                aria-labelledby={`course-group-${group.number}`}
              >
                <div className={styles.groupIntro}>
                  <span>{group.number}</span>
                  <p>{group.label}</p>
                  <h2 id={`course-group-${group.number}`}>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
                <div className={styles.courseCards}>
                  {group.courses.map((course) => (
                    <article className={styles.courseCard} key={course.title}>
                      <div>
                        <p className={styles.courseMeta}>{course.meta}</p>
                        <h3>{course.title}</h3>
                        <p>{course.summary}</p>
                      </div>
                      {course.state === "available" ? (
                        <div className={styles.coursePurchase}>
                          {course.syllabusHref ? (
                            <Link className={styles.syllabusLink} href={course.syllabusHref}>
                              {copy.viewSyllabus}
                              <span aria-hidden="true">→</span>
                            </Link>
                          ) : null}
                          <PurchaseButton lang={lang} />
                        </div>
                      ) : (
                        <span className={styles.comingSoon}>{copy.comingSoon}</span>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </section>

        <section className={styles.footerCta}>
          <Link href={newsHref}>{copy.browseNews}<span aria-hidden="true">↗</span></Link>
        </section>
        <SiteFooter lang={lang} />
      </main>
    </>
  );
}

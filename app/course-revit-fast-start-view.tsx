import Link from "next/link";
import PurchaseButton from "./purchase-button";
import Reveal from "./reveal";
import { SiteNav, SiteFooter } from "./site-chrome";
import { revitFastStartSyllabus } from "./course-revit-fast-start-content";
import type { Lang } from "./dictionaries";
import styles from "./course-syllabus.module.css";

export default function CourseRevitFastStartView({ lang }: { lang: Lang }) {
  const copy = revitFastStartSyllabus[lang];
  const courseHref = lang === "zh" ? "/course" : "/en/course";
  const languageHref =
    lang === "zh" ? "/en/course/revit-fast-start" : "/course/revit-fast-start";
  const skipLabel = lang === "zh" ? "跳到主要内容" : "Skip to main content";

  return (
    <>
      <a className="skip-link" href="#main-content">
        {skipLabel}
      </a>
      <main id="main-content" tabIndex={-1}>
        <SiteNav lang={lang} active="course" languageHref={languageHref} />

        <section className="service-hero">
          <Reveal>
            <Link className="service-back" href={courseHref}>
              <span aria-hidden="true">←</span>
              {copy.backLabel}
            </Link>
            <div className="eyebrow">
              <span />
              {copy.eyebrow}
            </div>
            <h1>{copy.title}</h1>
            <p className="service-intro">{copy.intro}</p>
            <div className={styles.stats}>
              <span className={styles.stat}>{copy.statsLessons}</span>
              <span className={styles.stat}>{copy.statsHours}</span>
              <span className={styles.stat}>{copy.statsAccess}</span>
            </div>
          </Reveal>
        </section>

        <section className={styles.body} aria-label={copy.title}>
          {copy.modules.map((module, index) => (
            <Reveal delay={Math.min(index * 40, 320)} key={module.number}>
              <section className={styles.module} aria-labelledby={`module-${module.number}`}>
                <div className={styles.moduleHead}>
                  <span className={styles.moduleNumber}>{module.number}</span>
                  <h2 id={`module-${module.number}`}>{module.title}</h2>
                </div>
                <ul className={styles.lessons}>
                  {module.lessons.map((lesson) => (
                    <li className={styles.lesson} key={`${module.number}-${lesson.code}`}>
                      <span className={styles.lessonCode}>{lesson.code}</span>
                      <span className={styles.lessonTitle}>{lesson.title}</span>
                      <span className={styles.lessonMinutes}>{lesson.minutes} min</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <div className={styles.delivery}>
              <h2>{copy.deliveryHeading}</h2>
              <p>{copy.deliveryBody}</p>
            </div>
          </Reveal>
        </section>

        <section className="service-cta">
          <Reveal>
            <h2>{copy.ctaHeading}</h2>
            <p>{copy.ctaIntro}</p>
            <PurchaseButton lang={lang} />
            <p className={styles.stat} style={{ marginTop: 16 }}>
              {copy.ctaNote}
            </p>
          </Reveal>
        </section>

        <SiteFooter lang={lang} />
      </main>
    </>
  );
}

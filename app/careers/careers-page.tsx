import Link from "next/link";
import { SiteFooter, SiteNav } from "../site-chrome";
import {
  careersContent,
  companiesByLang,
  type CareersLang,
} from "./careers-content";
import CompanyRanking from "./company-ranking";
import styles from "./careers.module.css";

export default function CareersPage({ lang }: { lang: CareersLang }) {
  const content = careersContent[lang];
  const companies = companiesByLang[lang];

  return (
    <div className={styles.careersRoot}>
      <a className="skip-link" href="#careers-main">
        {lang === "zh" ? "跳到主要内容" : "Skip to main content"}
      </a>
      <SiteNav lang={lang} active="careers" />

      <main id="careers-main" tabIndex={-1}>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
            <h1>
              {content.hero.titleBefore}
              <em>{content.hero.titleEm}</em>
              {content.hero.titleAfter}
            </h1>
            <p className={styles.heroIntro}>{content.hero.intro}</p>
          </div>
          <div className={styles.heroStats} aria-label="Page summary">
            {content.hero.stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className={styles.rankingSection}
          aria-labelledby="company-ranking-title"
        >
          <div className={styles.sectionHeading}>
            <p>{content.ranking.eyebrow}</p>
            <div>
              <h2 id="company-ranking-title">{content.ranking.title}</h2>
              <p>{content.ranking.intro}</p>
            </div>
          </div>
          <CompanyRanking companies={companies} copy={content.ranking} />
        </section>

        <section className={styles.prepSection} aria-labelledby="prep-title">
          <div className={styles.sectionHeading}>
            <p>{content.prep.eyebrow}</p>
            <div>
              <h2 id="prep-title">{content.prep.title}</h2>
              <p>{content.prep.intro}</p>
            </div>
          </div>

          <div className={styles.trackGrid}>
            {content.prep.tracks.map((track) => (
              <article className={styles.trackCard} key={track.number}>
                <div className={styles.trackMeta}>
                  <span>{track.number}</span>
                  <p>{track.companyLine}</p>
                </div>
                <h3>{track.title}</h3>
                <ul>
                  {track.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.resourceGrid}>
            <article className={styles.resourcePanel}>
              <p className={styles.panelIndex}>01 / HR</p>
              <h3>{content.prep.screenTitle}</h3>
              <ol className={styles.screenList}>
                {content.prep.screenItems.map(([title, copy], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div className={styles.stackedPanels}>
              <article className={styles.resourcePanel}>
                <p className={styles.panelIndex}>02 / PORTFOLIO</p>
                <h3>{content.prep.portfolioTitle}</h3>
                <ol className={styles.compactList}>
                  {content.prep.portfolioItems.map((item, index) => (
                    <li key={item}>
                      <span>{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </article>
              <article className={styles.resourcePanel}>
                <p className={styles.panelIndex}>03 / QUESTIONS</p>
                <h3>{content.prep.questionsTitle}</h3>
                <ul className={styles.questionList}>
                  {content.prep.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <article className={styles.sprint}>
            <div>
              <p className={styles.panelIndex}>04 / ACTION PLAN</p>
              <h3>{content.prep.planTitle}</h3>
            </div>
            <ol>
              {content.prep.days.map(([day, title, copy]) => (
                <li key={day}>
                  <span>{day}</span>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </article>
        </section>

        <aside className={styles.methodology} aria-labelledby="method-title">
          <div>
            <p>DATA NOTES</p>
            <h2 id="method-title">{content.methodology.title}</h2>
          </div>
          <div>
            {content.methodology.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </aside>

        <div className={styles.languageFooter}>
          <Link href={content.switchPath}>{content.switchLabel}</Link>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

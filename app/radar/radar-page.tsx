import Link from "next/link";
import { SiteFooter, SiteNav } from "../site-chrome";
import RadarSections from "./radar-sections";
import { radarContent, type RadarLang } from "./radar-content";
import styles from "./radar.module.css";

export default function RadarPage({ lang }: { lang: RadarLang }) {
  const content = radarContent[lang];

  return (
    <div className={styles.radarRoot}>
      <a className="skip-link" href="#radar-main">
        {content.skip}
      </a>
      <SiteNav lang={lang} active="radar" />

      <main id="radar-main" tabIndex={-1}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
            <h1>
              {content.hero.titleBefore}{" "}
              <em>{content.hero.titleEm}</em>
            </h1>
            <p className={styles.heroIntro}>{content.hero.intro}</p>
            <p className={styles.heroNote}>{content.hero.note}</p>
          </div>

          <div className={styles.radarGraphic} aria-hidden="true">
            <span className={styles.ringOne} />
            <span className={styles.ringTwo} />
            <span className={styles.ringThree} />
            <span className={styles.ringFour} />
            <span className={styles.crossHorizontal} />
            <span className={styles.crossVertical} />
            <span className={styles.sweep} />
            <span className={`${styles.point} ${styles.pointOne}`} />
            <span className={`${styles.point} ${styles.pointTwo}`} />
            <span className={`${styles.point} ${styles.pointThree}`} />
            <strong>BIM</strong>
            <small>GLOBAL SIGNAL</small>
          </div>

          <dl className={styles.heroStats}>
            {content.hero.stats.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <RadarSections lang={lang} />

        <section className={styles.awards} aria-labelledby="awards-title">
          <div>
            <p className={styles.eyebrow}>{content.awards.eyebrow}</p>
            <h2 id="awards-title">{content.awards.title}</h2>
            <p>{content.awards.intro}</p>
            <a
              className={styles.primaryLink}
              href={linksOpenBimAwards}
              target="_blank"
              rel="noreferrer"
            >
              {content.awards.cta}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ol>
            {content.awards.steps.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className={styles.editorialNote}>
          <div>
            <p>DATA NOTES</p>
            <h2>{content.note.title}</h2>
          </div>
          <div>
            {content.note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href={content.note.switchPath}>
              {content.note.switchLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

const linksOpenBimAwards =
  "https://awards.buildingsmart.org/about/JALwLwEP";

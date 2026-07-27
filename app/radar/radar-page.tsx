import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteNav } from "../site-chrome";
import EventFilter from "./event-filter";
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

        <nav className={styles.anchorNav} aria-label="Page sections">
          {content.anchors.map(([href, label], index) => (
            <a href={href} key={href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>

        <section
          className={`${styles.section} ${styles.eventsSection}`}
          id="events"
          aria-labelledby="events-title"
        >
          <SectionHeading
            eyebrow={content.events.eyebrow}
            title={content.events.title}
            intro={content.events.intro}
            titleId="events-title"
          />
          <EventFilter
            items={content.events.items}
            filters={content.events.filters}
            confirmed={content.events.confirmed}
            watch={content.events.watch}
            official={content.events.official}
            empty={content.events.empty}
          />
        </section>

        <section
          className={`${styles.section} ${styles.regionSection}`}
          id="regions"
          aria-labelledby="regions-title"
        >
          <SectionHeading
            eyebrow={content.regions.eyebrow}
            title={content.regions.title}
            intro={content.regions.intro}
            titleId="regions-title"
          />
          <div className={styles.regionGrid}>
            {content.regions.cards.map((card) => (
              <article className={styles.regionCard} key={card.code}>
                <div className={styles.countryBadge}>{card.code}</div>
                <p className={styles.cardKicker}>{card.country}</p>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                <p className={styles.signal}>{card.signal}</p>
                <a
                  className={styles.textLink}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.regions.official}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.standardSection}`}
          id="standards"
          aria-labelledby="standards-title"
        >
          <SectionHeading
            eyebrow={content.standards.eyebrow}
            title={content.standards.title}
            intro={content.standards.intro}
            titleId="standards-title"
          />
          <div className={styles.shelf}>
            {content.standards.cards.map((card, index) => (
              <article className={styles.shelfCard} key={card.title}>
                <div className={styles.shelfNumber}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className={styles.cardKicker}>{card.kicker}</p>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                <div className={styles.shelfFooter}>
                  <span>{card.note}</span>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${content.standards.official}: ${card.title}`}
                  >
                    {content.standards.official}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.researchSection}`}
          id="research"
          aria-labelledby="research-title"
        >
          <SectionHeading
            eyebrow={content.research.eyebrow}
            title={content.research.title}
            intro={content.research.intro}
            titleId="research-title"
          />
          <div className={styles.paperGrid}>
            {content.research.cards.map((card) => (
              <article className={styles.paperCard} key={card.title}>
                <div className={styles.paperMeta}>
                  <time>{card.date}</time>
                  <span>{content.research.preprint}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                <p className={styles.takeaway}>{card.takeaway}</p>
                <a
                  className={styles.textLink}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.research.source}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.peopleSection}`}
          id="people"
          aria-labelledby="people-title"
        >
          <SectionHeading
            eyebrow={content.people.eyebrow}
            title={content.people.title}
            intro={content.people.intro}
            titleId="people-title"
          />
          <div className={styles.peopleGrid}>
            {content.people.cards.map((card) => (
              <article className={styles.personCard} key={card.name}>
                <div className={styles.personTop}>
                  <div className={styles.personPortrait}>
                    <Image
                      className={styles.personPortraitImage}
                      src={card.image}
                      alt={card.imageAlt}
                      width={160}
                      height={160}
                      sizes="(max-width: 430px) 72px, 80px"
                      quality={82}
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3>{card.name}</h3>
                    <p>{card.role}</p>
                  </div>
                </div>
                <ol className={styles.path}>
                  {card.path.map((step, index) => (
                    <li key={step}>
                      <span>{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className={styles.lesson}>{card.lesson}</p>
                <a
                  className={styles.textLink}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.people.profile}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

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

function SectionHeading({
  eyebrow,
  title,
  intro,
  titleId,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  titleId: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <div>
        <h2 id={titleId}>{title}</h2>
        <p>{intro}</p>
      </div>
    </div>
  );
}

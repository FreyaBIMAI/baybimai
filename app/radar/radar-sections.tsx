import Image from "next/image";
import EventFilter from "./event-filter";
import { radarContent, type RadarLang } from "./radar-content";
import styles from "./radar.module.css";

// The five core Radar sections (events/regions/standards/research/people)
// plus their own jump-nav, shared between the standalone /radar page and the
// homepage embed. Deliberately excludes the Radar hero, awards section, and
// editorial-note aside — those stay specific to the standalone page.
export default function RadarSections({ lang }: { lang: RadarLang }) {
  const content = radarContent[lang];

  return (
    <>
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
    </>
  );
}

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

import Link from "next/link";
import { getLatestPublishedNews } from "../../lib/news-publications";
import NewsFeedback from "./news-feedback";
import NewsShell from "./news-shell";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

function formatIssueDate(date: string, locale: string) {
  const value = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(value.getTime())) return date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(value);
}

export default async function NewsIndex({ lang }: { lang: NewsLang }) {
  const content = newsContent[lang];
  const index = content.index;
  const publication = await getLatestPublishedNews(lang);
  const signals = publication?.signals ?? index.signals;
  const issueDate = publication
    ? formatIssueDate(publication.issueDate, content.locale)
    : index.eyebrow.replace(/^.*·\s*/, "");
  const featureTitle = publication?.headline ?? index.featuredTitle;
  const featureSummary = publication?.summary ?? index.featuredSummary;
  const feedbackIssueDate = publication?.issueDate ??
    (index.eyebrow.match(/\d{4}[.-]\d{2}[.-]\d{2}/)?.[0] ?? "2026-08-05").replace(/\./g, "-");

  return (
    <NewsShell lang={lang}>
      <main id="news-main" className={styles.indexMain} tabIndex={-1}>
        <section className={styles.newsHero}>
          <p className={styles.kicker}>{index.eyebrow}</p>
          <h1>
            {index.titleBefore} <em>{index.titleEm}</em>
            {index.titleAfter ? ` ${index.titleAfter}` : ""}
          </h1>
          <p className={styles.newsIntro}>{index.intro}</p>
        </section>

        <section className={styles.membership} aria-labelledby="membership-title">
          <div>
            <p>{index.membership.label}</p>
            <h2 id="membership-title">{index.membership.title}</h2>
            <span>{index.membership.price}</span>
          </div>
          <div>
            <p>{index.membership.body}</p>
            <Link href={index.membership.href} className={styles.membershipLink}>
              {index.membership.cta}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className={styles.featured} aria-labelledby="featured-title">
          <div className={styles.featuredMeta}>
            <p>{index.featuredLabel}</p>
            <span>{publication ? issueDate : index.readTime}</span>
          </div>
          <div className={styles.featuredGrid}>
            <div>
              <h2 id="featured-title">{featureTitle}</h2>
              <p>{featureSummary}</p>
            </div>
            <a className={styles.readLink} href={content.articlePath}>
              {index.readArticle}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={styles.signals} aria-labelledby="signals-title">
          <div className={styles.sectionHeading}>
            <p>DAILY SIGNALS</p>
            <h2 id="signals-title">{index.signalTitle}</h2>
          </div>
          <div className={styles.signalGrid}>
            {signals.map((signal) => (
              <article className={styles.signalCard} key={signal.company}>
                <div className={styles.signalMeta}>
                  <span>{signal.company}</span>
                  <time>{signal.date}</time>
                </div>
                <h3>{signal.title}</h3>
                <p>{signal.copy}</p>
                <a
                  href={signal.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${index.sourceLabel}: ${signal.company}`}
                >
                  {index.sourceLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.signals} aria-labelledby="researchers-title">
          <div className={styles.sectionHeading}>
            <p>{index.researchers.eyebrow}</p>
            <h2 id="researchers-title">{index.researchers.title}</h2>
          </div>
          <p className={styles.followIntro}>{index.researchers.intro}</p>
          <div className={styles.signalGrid}>
            {index.researchers.people.map((person) => (
              <article className={styles.signalCard} key={person.handle}>
                <div className={styles.signalMeta}>
                  <span>{person.handle}</span>
                </div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <a
                  href={person.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${index.researchers.followLabel}: ${person.name}`}
                >
                  {index.researchers.followLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <NewsFeedback lang={lang} issueDate={feedbackIssueDate} />
      </main>
    </NewsShell>
  );
}

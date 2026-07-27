import NewsShell from "./news-shell";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

export default function NewsIndex({ lang }: { lang: NewsLang }) {
  const content = newsContent[lang];
  const index = content.index;

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

        <section className={styles.featured} aria-labelledby="featured-title">
          <div className={styles.featuredMeta}>
            <p>{index.featuredLabel}</p>
            <span>{index.readTime}</span>
          </div>
          <div className={styles.featuredGrid}>
            <div>
              <h2 id="featured-title">{index.featuredTitle}</h2>
              <p>{index.featuredSummary}</p>
            </div>
            <a className={styles.readLink} href={content.articlePath}>
              {index.readArticle}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={styles.signals} aria-labelledby="signals-title">
          <div className={styles.sectionHeading}>
            <p>WEEKLY SIGNALS</p>
            <h2 id="signals-title">{index.signalTitle}</h2>
          </div>
          <div className={styles.signalGrid}>
            {index.signals.map((signal) => (
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
      </main>
    </NewsShell>
  );
}

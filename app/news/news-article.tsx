import NewsShell from "./news-shell";
import ReadingTools from "./reading-tools";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

export default function NewsArticle({ lang }: { lang: NewsLang }) {
  const content = newsContent[lang];
  const article = content.article;

  return (
    <NewsShell lang={lang} article>
      <main id="news-main" tabIndex={-1}>
        <ReadingTools lang={lang}>
          <article id="article-body" className={styles.article}>
            <header className={styles.articleHeader}>
              <a className={styles.backLink} href={content.newsPath}>
                <span aria-hidden="true">←</span>
                {article.back}
              </a>
              <div className={styles.articleMeta}>
                <span>{article.category}</span>
                <time>{article.date}</time>
                <span>{article.readTime}</span>
              </div>
              <h1>{article.title}</h1>
              <p className={styles.articleDeck}>{article.deck}</p>
            </header>

            <div className={styles.articleBody}>
              <p className={styles.articleLead}>{article.intro}</p>

              {article.sections.map((section) => (
                <section
                  className={styles.articleSection}
                  key={section.number}
                  aria-labelledby={`section-${section.number}`}
                >
                  <div className={styles.sectionNumber}>{section.number}</div>
                  <div>
                    <h2 id={`section-${section.number}`}>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <aside className={styles.takeaway}>
                <p className={styles.takeawayLabel}>{article.takeawayTitle}</p>
                <ol>
                  {article.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ol>
              </aside>

              <p className={styles.editorialNote}>{article.note}</p>

              <section
                className={styles.sourceSection}
                aria-labelledby="source-title"
              >
                <h2 id="source-title">{article.sourcesTitle}</h2>
                <ol>
                  {article.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>
        </ReadingTools>
      </main>
    </NewsShell>
  );
}

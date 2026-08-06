"use client";

import { useMemo } from "react";
import NewsShell from "./news-shell";
import ReadingTools from "./reading-tools";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";
import { tokenizeSegment, useReadingCursor, type WordToken } from "../reading-cursor";

type Segment = { key: string; text: string; start: number; highlight: boolean };

// Rebuilds the exact same segment order (and therefore character offsets)
// used to build `speechText` below, so the read-along cursor's charIndex —
// reported against that joined string — can be mapped back to a word here.
function buildSegments(
  article: (typeof newsContent)[NewsLang]["article"],
): { speechText: string; segments: Segment[] } {
  const segments: Segment[] = [];
  let offset = 0;
  const push = (key: string, text: string, highlight: boolean) => {
    segments.push({ key, text, start: offset, highlight });
    offset += text.length + 1; // +1 for the space `.join(" ")` inserts
  };

  push("title", article.title, false);
  push("deck", article.deck, false);
  push("intro", article.intro, true);
  article.sections.forEach((section) => {
    push(`section-title-${section.number}`, section.title, false);
    section.paragraphs.forEach((paragraph, index) => {
      push(`section-${section.number}-p${index}`, paragraph, true);
    });
  });
  push("takeaway-title", article.takeawayTitle, false);
  article.takeaways.forEach((takeaway, index) => {
    push(`takeaway-${index}`, takeaway, true);
  });

  return { speechText: segments.map((segment) => segment.text).join(" "), segments };
}

// Rendered as ReadingTools' children, so — unlike NewsArticle below, which
// creates ReadingTools and is therefore its ancestor, not its descendant —
// this component sits under ReadingCursorContext.Provider in the tree and
// can actually read the live playback position from it.
function ArticleBody({
  content,
  article,
  segments,
}: {
  content: (typeof newsContent)[NewsLang];
  article: (typeof newsContent)[NewsLang]["article"];
  segments: Segment[];
}) {
  const { active, charIndex } = useReadingCursor();

  const tokens = useMemo(
    () =>
      segments
        .filter((segment) => segment.highlight)
        .flatMap((segment) => tokenizeSegment(segment.key, segment.text, segment.start)),
    [segments],
  );
  const tokensBySegment = useMemo(() => {
    const map = new Map<string, WordToken[]>();
    for (const token of tokens) {
      const list = map.get(token.segmentKey);
      if (list) list.push(token);
      else map.set(token.segmentKey, [token]);
    }
    return map;
  }, [tokens]);
  const activeToken = useMemo(() => {
    if (!active) return null;
    let result: WordToken | null = null;
    for (const token of tokens) {
      if (token.start <= charIndex) result = token;
      else break;
    }
    return result;
  }, [tokens, active, charIndex]);

  const renderReadable = (segmentKey: string) => {
    const segmentTokens = tokensBySegment.get(segmentKey) ?? [];
    return segmentTokens.map((token, index) => (
      <span key={token.start}>
        <span
          className={
            activeToken?.start === token.start
              ? `${styles.word} ${styles.activeWord}`
              : styles.word
          }
        >
          {token.text}
        </span>
        {index < segmentTokens.length - 1 ? " " : ""}
      </span>
    ));
  };

  return (
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
        <p className={styles.articleLead}>{renderReadable("intro")}</p>

        {article.sections.map((section) => (
          <section
            className={styles.articleSection}
            key={section.number}
            aria-labelledby={`section-${section.number}`}
          >
            <div className={styles.sectionNumber}>{section.number}</div>
            <div>
              <h2 id={`section-${section.number}`}>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={paragraph}>{renderReadable(`section-${section.number}-p${index}`)}</p>
              ))}
            </div>
          </section>
        ))}

        <aside className={styles.takeaway}>
          <p className={styles.takeawayLabel}>{article.takeawayTitle}</p>
          <ol>
            {article.takeaways.map((takeaway, index) => (
              <li key={takeaway}>{renderReadable(`takeaway-${index}`)}</li>
            ))}
          </ol>
        </aside>

        <p className={styles.editorialNote}>{article.note}</p>

        <section className={styles.sourceSection} aria-labelledby="source-title">
          <h2 id="source-title">{article.sourcesTitle}</h2>
          <ol>
            {article.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}

export default function NewsArticle({ lang }: { lang: NewsLang }) {
  const content = newsContent[lang];
  const article = content.article;
  const { speechText, segments } = useMemo(() => buildSegments(article), [article]);

  return (
    <NewsShell lang={lang} article>
      <main id="news-main" tabIndex={-1}>
        <ReadingTools lang={lang} speechText={speechText}>
          <ArticleBody content={content} article={article} segments={segments} />
        </ReadingTools>
      </main>
    </NewsShell>
  );
}

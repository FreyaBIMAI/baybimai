import type { ReactNode } from "react";
import { SiteNav } from "../site-chrome";
import { newsContent, type NewsLang } from "./news-content";
import styles from "./news.module.css";

export default function NewsShell({
  lang,
  article = false,
  children,
}: {
  lang: NewsLang;
  article?: boolean;
  children: ReactNode;
}) {
  const content = newsContent[lang];
  const switchPath = article
    ? content.switchArticlePath
    : content.switchPath;

  return (
    <div className={styles.newsRoot}>
      <a className={styles.skipLink} href="#news-main">
        {content.skip}
      </a>
      <header className={styles.header}>
        <SiteNav lang={lang} active="news" languageHref={switchPath} />
      </header>
      {children}
      <footer className={styles.footer}>
        <a className={styles.brand} href={content.homePath}>
          BAY<span>BIM</span>AI
        </a>
        <p>{content.footer}</p>
        <p>© {new Date().getFullYear()} BAYBIMAI.ORG</p>
      </footer>
    </div>
  );
}

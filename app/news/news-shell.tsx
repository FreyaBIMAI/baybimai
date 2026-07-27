import type { ReactNode } from "react";
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
        <nav className={styles.nav} aria-label={content.navAria}>
          <a
            className={styles.brand}
            href={content.homePath}
            aria-label={content.brandAria}
          >
            BAY<span>BIM</span>AI
          </a>
          <div className={styles.navLinks}>
            <a href={content.homePath}>{content.navHome}</a>
            <a href={content.newsPath} aria-current="page">
              {content.navNews}
            </a>
            <a href={content.careersPath}>{content.navCareers}</a>
            <a className={styles.languageLink} href={switchPath}>
              {content.switchLabel}
            </a>
          </div>
        </nav>
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

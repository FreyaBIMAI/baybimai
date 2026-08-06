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
        <RadarSections lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

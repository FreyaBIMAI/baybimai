import { SiteFooter, SiteNav } from "../site-chrome";
import { dailyCopy, dailyLessons, type DailyLang } from "./daily-content";
import { dailyLessonsRound2 } from "./daily-content-round2";
import DailyReader from "./daily-reader";
import styles from "./daily.module.css";

// One continuous 56-day journey: weeks 1-4 (daily-content.ts) followed by
// weeks 5-8 (daily-content-round2.ts). See the header comment in
// daily-content-round2.ts for why weeks/ids don't collide.
const allDailyLessons = [...dailyLessons, ...dailyLessonsRound2];

export default function DailyPage({ lang }: { lang: DailyLang }) {
  const copy = dailyCopy[lang];

  return (
    <div className={styles.dailyRoot}>
      <a className="skip-link" href="#today">{copy.skip}</a>
      <SiteNav lang={lang} active="daily" />
      <main>
        <section className={styles.hero} aria-labelledby="daily-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="daily-title">{copy.title}</h1>
            <p className={styles.heroIntro}>{copy.intro}</p>
            <ul className={styles.rules} aria-label="Daily format">
              {copy.rules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
            <a className={styles.startLink} href="#today">
              {copy.today}<span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className={styles.heroMark} aria-hidden="true">
            <div><span>6</span><small>MIN</small></div>
            <p>READ<br />LISTEN<br />SAY<br />WRITE</p>
          </div>
        </section>

        <DailyReader lang={lang} copy={copy} lessons={allDailyLessons} />
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

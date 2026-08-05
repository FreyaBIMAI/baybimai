import NewsShell from "./news-shell";
import SubscribeButton from "../subscribe-button";
import { type NewsLang } from "./news-content";
import styles from "./news.module.css";

const copy = {
  zh: {
    backLabel: "返回新闻首页",
    backHref: "/news",
    eyebrow: "BAYBIMAI NEWS · 会员",
    title: "订阅每周 BIM 深度报告",
    intro:
      "加入会员后，每周一自动更新的头条与关键信号第一时间推送，并解锁完整历史归档与语音朗读。",
    features: [
      "每周一更新：头条深度报告 + 三条关键信号",
      "完整历史归档，随时回看过往报告",
      "语音朗读与文字跟读，通勤路上也能听完",
      "随时可取消，按月或按年付费",
    ],
    monthlyLabel: "月度会员",
    monthlyPrice: "$5.9",
    monthlyUnit: "/ 月",
    yearlyLabel: "年度会员",
    yearlyPrice: "$59",
    yearlyUnit: "/ 年",
    yearlyNote: "相当于每月 $4.9，比月付省 17%",
  },
  en: {
    backLabel: "Back to News",
    backHref: "/en/news",
    eyebrow: "BAYBIMAI NEWS · MEMBERSHIP",
    title: "Subscribe to the weekly BIM intelligence report",
    intro:
      "Members get the Monday headline and signal roundup first, plus the full archive and read-aloud support.",
    features: [
      "New headline + 3 key signals every Monday",
      "Full archive access — revisit any past report",
      "Read-aloud and word-by-word follow-along",
      "Cancel anytime — pay monthly or yearly",
    ],
    monthlyLabel: "Monthly",
    monthlyPrice: "$5.9",
    monthlyUnit: "/ mo",
    yearlyLabel: "Yearly",
    yearlyPrice: "$59",
    yearlyUnit: "/ yr",
    yearlyNote: "That's $4.9/mo — 17% cheaper than monthly",
  },
} as const;

export default function SubscribeView({ lang }: { lang: NewsLang }) {
  const dict = copy[lang];

  return (
    <NewsShell lang={lang}>
      <main id="news-main" className={styles.indexMain} tabIndex={-1}>
        <section className={styles.newsHero}>
          <a className={`${styles.readLink} ${styles.subscribeBack}`} href={dict.backHref}>
            <span aria-hidden="true">←</span>
            {dict.backLabel}
          </a>
          <p className={styles.kicker}>{dict.eyebrow}</p>
          <h1>{dict.title}</h1>
          <p className={styles.newsIntro}>{dict.intro}</p>
        </section>

        <section className={styles.featured}>
          <div className={styles.featuredGrid}>
            <ul className={styles.subscribeFeatureList}>
              {dict.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <SubscribeButton lang={lang} />
          </div>
        </section>
      </main>
    </NewsShell>
  );
}

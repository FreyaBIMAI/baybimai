import Link from "next/link";
import AutoScrollIntro from "./auto-scroll-intro";
import ContactForm from "./contact-form";
import PurchaseButton from "./purchase-button";
import RadarSections from "./radar/radar-sections";
import radarStyles from "./radar/radar.module.css";
import Reveal from "./reveal";
import { SiteNav, SiteFooter } from "./site-chrome";
import { dictionaries, floatingTerms, type Lang } from "./dictionaries";

// Fixed star count/positions for the hero halo background (see .halo-star-N
// in globals.css) — kept static so server and client markup always match.
const heroStars = Array.from({ length: 16 }, (_, index) => index + 1);

// Anchor ids for the 4 offer cards, in the same fixed order as dict.offers
// (Course, HOTSPOT/News, Audit, Training) — used by the quick-nav strip
// below the header.
const offerAnchorIds = ["home-course", "home-news", "home-audit", "home-training"];

const quickNavCopy: Record<Lang, { contact: string; course: string; news: string; audit: string; training: string }> = {
  zh: {
    contact: "联系我们",
    course: "课程探索",
    news: "订阅 NEWS",
    audit: "BIM 咨询",
    training: "企业 BIM 培训",
  },
  en: {
    contact: "Contact Us",
    course: "Explore Courses",
    news: "Subscribe NEWS",
    audit: "BIM Consulting",
    training: "Enterprise Training",
  },
};

export default function HomeView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const terms = floatingTerms[lang];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dict.skipLink}
      </a>
      <main id="main-content" tabIndex={-1}>
        <AutoScrollIntro />
        <SiteNav lang={lang} active="home" />

        <nav className="home-quick-nav" aria-label={lang === "zh" ? "快速导航" : "Quick navigation"}>
          <a href="#contact">{quickNavCopy[lang].contact}</a>
          <a href={`#${offerAnchorIds[0]}`}>{quickNavCopy[lang].course}</a>
          <a href={`#${offerAnchorIds[1]}`}>{quickNavCopy[lang].news}</a>
          <a href={`#${offerAnchorIds[2]}`}>{quickNavCopy[lang].audit}</a>
          <a href={`#${offerAnchorIds[3]}`}>{quickNavCopy[lang].training}</a>
        </nav>

        <section className="hero" id="top">
          <div className="hero-halo" aria-hidden="true">
            <div className="halo-glow" />
            <div className="halo-ring" />
            {heroStars.map((star) => (
              <span className={`halo-star halo-star-${star}`} key={star} />
            ))}
            <span className="shooting-star" />
            <span className="shooting-star shooting-star-b" />
          </div>

          <div className="star-field" aria-hidden="true">
            {terms.map((term, index) => (
              <span className={`float-term term-${index + 1}`} key={term}>
                {term}
              </span>
            ))}
          </div>

          <Reveal className="hero-copy" id="contact">
            <div className="eyebrow">
              <span />
              {dict.hero.eyebrow}
            </div>
            <h1>
              {dict.hero.titleBefore}
              <em>{dict.hero.titleEm}</em>
              {dict.hero.titleAfter}
              <br />
              {dict.hero.titleLine2}
            </h1>
            <p className="subtitle">
              {dict.hero.subtitleLine1}
              <br />
              {dict.hero.subtitleLine2}
            </p>
            <ContactForm lang={lang} />
          </Reveal>

          <div className="bim-graphic" aria-hidden="true">
            <div className="plane plane-a" />
            <div className="plane plane-b" />
            <div className="axis axis-x" />
            <div className="axis axis-y" />
            <div className="node node-a" />
            <div className="node node-b" />
            <div className="node node-c" />
            <span>BIM</span>
          </div>
        </section>

        <section className="offers" id="courses" aria-labelledby="offers-title">
          <Reveal className="offers-heading">
            <p>{dict.offersSection.eyebrow}</p>
            <h2 id="offers-title">{dict.offersSection.heading}</h2>
          </Reveal>

          <div className="cards">
            {dict.offers.map((offer, index) => (
              <Reveal delay={index * 90} key={offer.title}>
                <article
                  id={offerAnchorIds[index]}
                  className={`card card-${offer.theme} ${offer.featured ? "featured" : ""}`}
                >
                  <div className="card-top">
                    <span className="card-index">0{index + 1}</span>
                    {offer.featured ? (
                      <Link className="card-tag card-course-explore" href={offer.detailHref}>
                        {lang === "zh" ? "课程探索" : "EXPLORE COURSES"}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ) : offer.action ? (
                      <Link className="card-tag card-subscribe-link" href={offer.action.href}>
                        {offer.action.label}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ) : (
                      <span className="card-tag">{offer.tag}</span>
                    )}
                  </div>
                  <h3>{offer.title}</h3>
                  <p>{offer.copy}</p>
                  <div className="card-footer">
                    <div className="card-note-row">
                      <div className="card-note">{offer.note}</div>
                      <Link className="card-detail-link" href={offer.detailHref}>
                        {dict.offersSection.detailLabel}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                    {offer.featured ? <PurchaseButton lang={lang} /> : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <div className={radarStyles.radarRoot}>
          <RadarSections lang={lang} />
        </div>

        <SiteFooter lang={lang} />
      </main>
    </>
  );
}

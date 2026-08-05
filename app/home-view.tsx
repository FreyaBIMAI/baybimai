import Link from "next/link";
import AutoScrollIntro from "./auto-scroll-intro";
import ContactForm from "./contact-form";
import PurchaseButton from "./purchase-button";
import Reveal from "./reveal";
import { SiteNav, SiteFooter } from "./site-chrome";
import { dictionaries, floatingTerms, type Lang } from "./dictionaries";

// Fixed star count/positions for the hero halo background (see .halo-star-N
// in globals.css) — kept static so server and client markup always match.
const heroStars = Array.from({ length: 16 }, (_, index) => index + 1);

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

          <Reveal className="hero-copy">
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
                  className={`card card-${offer.theme} ${offer.featured ? "featured" : ""}`}
                >
                  <div className="card-top">
                    <span className="card-index">0{index + 1}</span>
                    <span className="card-tag">{offer.tag}</span>
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

        <SiteFooter lang={lang} />
      </main>
    </>
  );
}

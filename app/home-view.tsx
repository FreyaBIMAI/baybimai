import Link from "next/link";
import ContactForm from "./contact-form";
import PurchaseButton from "./purchase-button";
import { SiteNav, SiteFooter } from "./site-chrome";
import { dictionaries, floatingTerms, type Lang } from "./dictionaries";

export default function HomeView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const terms = floatingTerms[lang];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dict.skipLink}
      </a>
      <main id="main-content" tabIndex={-1}>
        <SiteNav lang={lang} />

        <section className="hero" id="top">
          <div className="star-field" aria-hidden="true">
            {terms.map((term, index) => (
              <span className={`float-term term-${index + 1}`} key={term}>
                {term}
              </span>
            ))}
          </div>

          <div className="hero-copy">
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
          </div>

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
          <div className="offers-heading">
            <p>{dict.offersSection.eyebrow}</p>
            <h2 id="offers-title">{dict.offersSection.heading}</h2>
          </div>

          <div className="cards">
            {dict.offers.map((offer, index) => (
              <article
                className={`card ${offer.featured ? "featured" : ""}`}
                key={offer.title}
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
            ))}
          </div>
        </section>

        <SiteFooter lang={lang} />
      </main>
    </>
  );
}

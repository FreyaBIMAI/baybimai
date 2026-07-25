"use client";

import ContactForm from "./contact-form";
import PurchaseButton from "./purchase-button";
import LanguageToggle from "./language-toggle";
import { useLanguage } from "./language-context";
import { floatingTerms } from "./dictionaries";

export default function Home() {
  const { lang, dict } = useLanguage();
  const terms = floatingTerms[lang];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dict.skipLink}
      </a>
      <main id="main-content" tabIndex={-1}>
        <nav className="nav" aria-label={dict.nav.ariaLabel}>
          <a className="brand" href="#top" aria-label={dict.nav.brandAria}>
            BAY<span>BIM</span>AI
          </a>
          <div className="nav-meta">
            <p>{dict.nav.tagline}</p>
            <LanguageToggle />
          </div>
        </nav>

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
            <ContactForm />
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
                  <div className="card-note">{offer.note}</div>
                  {offer.featured ? <PurchaseButton /> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <a className="brand" href="#top" aria-label={dict.footer.brandAria}>
            BAY<span>BIM</span>AI
          </a>
          <p>{dict.footer.tagline}</p>
          <p>© {new Date().getFullYear()} BAYBIMAI.ORG</p>
        </footer>
      </main>
    </>
  );
}

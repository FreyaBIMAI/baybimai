import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNav, SiteFooter } from "./site-chrome";
import { servicesContent, type ServiceKey } from "./services-content";
import { dictionaries, type Lang } from "./dictionaries";

const THEME_BY_SERVICE: Record<ServiceKey, string> = {
  course: "service-theme-green",
  training: "service-theme-blue",
  audit: "service-theme-purple",
};

export default function ServiceDetailView({
  lang,
  service,
  cta,
}: {
  lang: Lang;
  service: ServiceKey;
  cta: ReactNode;
}) {
  const dict = dictionaries[lang];
  const content = servicesContent[lang][service];
  const homeHref = lang === "zh" ? "/" : "/en";

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dict.skipLink}
      </a>
      <main id="main-content" tabIndex={-1}>
        <SiteNav lang={lang} />

        <div className={THEME_BY_SERVICE[service]}>
          <section className="service-hero">
            <Link className="service-back" href={homeHref}>
              <span aria-hidden="true">←</span>
              {content.backLabel}
            </Link>
            <div className="eyebrow">
              <span />
              {content.eyebrow}
            </div>
            <h1>{content.title}</h1>
            <p className="service-intro">{content.intro}</p>
          </section>

          <section className="service-body">
            {content.sections.map((section) => (
              <div className="service-block" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <section className="service-cta">
            <h2>{content.ctaHeading}</h2>
            <p>{content.ctaIntro}</p>
            {cta}
          </section>
        </div>

        <SiteFooter lang={lang} />
      </main>
    </>
  );
}

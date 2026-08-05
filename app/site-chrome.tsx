import Link from "next/link";
import LanguageToggle from "./language-toggle";
import { dictionaries, type Lang } from "./dictionaries";

export function SiteNav({
  lang,
  active,
  languageHref: languageHrefOverride,
}: {
  lang: Lang;
  active?: "news" | "careers" | "radar" | "daily";
  languageHref?: string;
}) {
  const dict = dictionaries[lang];
  const languageHref =
    languageHrefOverride ?? (active === "news"
      ? lang === "zh"
        ? "/en/news"
        : "/news"
      : active === "careers"
        ? lang === "zh"
          ? "/en/careers"
          : "/careers"
        : active === "radar"
          ? lang === "zh"
            ? "/en/radar"
            : "/radar"
          : active === "daily"
            ? lang === "zh"
              ? "/en/daily"
              : "/daily"
            : undefined);

  return (
    <nav className="nav" aria-label={dict.nav.ariaLabel}>
      <Link className="brand" href={lang === "zh" ? "/" : "/en"} aria-label={dict.nav.brandAria}>
        BAY<span>BIM</span>AI
      </Link>
      <div className="nav-meta">
        <p>{dict.nav.tagline}</p>
        <Link
          className="nav-link nav-link-news"
          href={lang === "zh" ? "/news" : "/en/news"}
          aria-current={active === "news" ? "page" : undefined}
        >
          {dict.nav.newsLabel}
        </Link>
        <Link
          className="nav-link nav-link-careers"
          href={lang === "zh" ? "/careers" : "/en/careers"}
          aria-current={active === "careers" ? "page" : undefined}
        >
          {dict.nav.careersLabel}
        </Link>
        <Link
          className="nav-link nav-link-radar"
          href={lang === "zh" ? "/radar" : "/en/radar"}
          aria-current={active === "radar" ? "page" : undefined}
        >
          {dict.nav.radarLabel}
        </Link>
        <Link
          className="nav-link nav-link-daily"
          href={lang === "zh" ? "/daily" : "/en/daily"}
          aria-current={active === "daily" ? "page" : undefined}
        >
          {dict.nav.dailyLabel}
        </Link>
        <LanguageToggle lang={lang} href={languageHref} />
      </div>
    </nav>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];

  return (
    <footer>
      <Link className="brand" href={lang === "zh" ? "/" : "/en"} aria-label={dict.footer.brandAria}>
        BAY<span>BIM</span>AI
      </Link>
      <p>{dict.footer.tagline}</p>
      <p>© {new Date().getFullYear()} BAYBIMAI.ORG</p>
    </footer>
  );
}

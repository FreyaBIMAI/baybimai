import Link from "next/link";
import LanguageToggle from "./language-toggle";
import { dictionaries, type Lang } from "./dictionaries";

export function SiteNav({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];

  return (
    <nav className="nav" aria-label={dict.nav.ariaLabel}>
      <Link className="brand" href={lang === "zh" ? "/" : "/en"} aria-label={dict.nav.brandAria}>
        BAY<span>BIM</span>AI
      </Link>
      <div className="nav-meta">
        <p>{dict.nav.tagline}</p>
        <Link className="nav-link" href={lang === "zh" ? "/news" : "/en/news"}>
          {dict.nav.newsLabel}
        </Link>
        <LanguageToggle lang={lang} />
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

import Link from "next/link";
import LanguageToggle from "./language-toggle";
import { dictionaries, type Lang } from "./dictionaries";

export function SiteNav({
  lang,
  active,
  languageHref: languageHrefOverride,
}: {
  lang: Lang;
  active?: "home" | "course" | "news" | "careers" | "radar" | "daily";
  languageHref?: string;
}) {
  const dict = dictionaries[lang];
  const courseLinks = lang === "zh"
    ? [
        { href: "/course#foundation", label: "入门" },
        { href: "/course#advanced", label: "进阶" },
        { href: "/course#expansion", label: "拓展" },
      ]
    : [
        { href: "/en/course#foundation", label: "Foundation" },
        { href: "/en/course#advanced", label: "Advanced" },
        { href: "/en/course#expansion", label: "Expansion" },
      ];
  const languageHref =
    languageHrefOverride ?? (active === "course"
      ? lang === "zh"
        ? "/en/course"
        : "/course"
      : active === "news"
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
        <Link
          className="nav-link nav-link-home"
          href={lang === "zh" ? "/" : "/en"}
          aria-current={active === "home" ? "page" : undefined}
        >
          {dict.nav.homeLabel}
        </Link>
        <span className="nav-separator" aria-hidden="true">｜</span>
        <details className={`nav-course-menu ${active === "course" ? "nav-course-current" : ""}`}>
          <summary
            className="nav-link nav-link-course"
            aria-current={active === "course" ? "page" : undefined}
            aria-label={lang === "zh" ? "课程分类" : "Course categories"}
          >
            COURSE
            <span className="nav-course-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="nav-course-popover">
            {courseLinks.map((course) => (
              <Link href={course.href} key={course.href}>
                {course.label}
              </Link>
            ))}
          </div>
        </details>
        <span className="nav-separator" aria-hidden="true">｜</span>
        <Link
          className="nav-link nav-link-hotspot"
          href={lang === "zh" ? "/news" : "/en/news"}
          aria-current={active === "news" ? "page" : undefined}
        >
          {dict.nav.hotspotLabel}
        </Link>
        <span className="nav-separator" aria-hidden="true">｜</span>
        <Link
          className="nav-link nav-link-radar"
          href={lang === "zh" ? "/radar" : "/en/radar"}
          aria-current={active === "radar" ? "page" : undefined}
        >
          {dict.nav.radarLabel}
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

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
  const homePath = lang === "zh" ? "" : "/en";
  const homeLinks = lang === "zh"
    ? [
        { href: `${homePath}/#contact`, label: "联系我们" },
        { href: `${homePath}/#home-course`, label: "课程与订阅" },
        { href: `${homePath}/#home-audit`, label: "BIM 咨询和企业培训" },
        { href: `${homePath}/#events`, label: "01 活动" },
        { href: `${homePath}/#regions`, label: "02 区域进展" },
        { href: `${homePath}/#standards`, label: "03 规则手册" },
        { href: `${homePath}/#research`, label: "04 论文" },
        { href: `${homePath}/#people`, label: "05 人物路径" },
      ]
    : [
        { href: `${homePath}/#contact`, label: "Contact Us" },
        { href: `${homePath}/#home-course`, label: "Courses & Subscription" },
        { href: `${homePath}/#home-audit`, label: "BIM Consulting & Enterprise Training" },
        { href: `${homePath}/#events`, label: "01 Events" },
        { href: `${homePath}/#regions`, label: "02 Regional progress" },
        { href: `${homePath}/#standards`, label: "03 Rulebooks" },
        { href: `${homePath}/#research`, label: "04 Research" },
        { href: `${homePath}/#people`, label: "05 Builder paths" },
      ];
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
        <details className={`nav-course-menu ${active === "home" ? "nav-course-current" : ""}`}>
          <summary
            className="nav-link nav-link-home"
            aria-current={active === "home" ? "page" : undefined}
            aria-label={lang === "zh" ? "首页板块" : "Home sections"}
          >
            {dict.nav.homeLabel}
            <span className="nav-course-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="nav-course-popover nav-home-popover">
            {homeLinks.slice(0, 3).map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <span className="nav-popover-divider" aria-hidden="true" />
            <p className="nav-popover-group-label">
              {lang === "zh" ? "行业 Radar" : "Industry Radar"}
            </p>
            <div className="nav-popover-radar-group">
              {homeLinks.slice(3).map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </details>
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

import Link from "next/link";
import { dictionaries, type Lang } from "./dictionaries";

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const target = lang === "zh" ? "/en" : "/";

  return (
    <Link
      className="lang-toggle"
      href={target}
      aria-label={dict.langToggleAria}
    >
      {dict.langToggleLabel}
    </Link>
  );
}

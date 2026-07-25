"use client";

import { useLanguage } from "./language-context";

export default function LanguageToggle() {
  const { dict, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLang}
      aria-label={dict.langToggleAria}
    >
      {dict.langToggleLabel}
    </button>
  );
}

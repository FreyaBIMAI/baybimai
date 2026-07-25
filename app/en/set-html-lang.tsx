"use client";

import { useEffect } from "react";

// app/layout.tsx sets a single shared <html lang="zh-CN">; this route-local
// override corrects it for assistive tech and browser translate prompts
// without restructuring the whole app into per-locale root layouts.
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}

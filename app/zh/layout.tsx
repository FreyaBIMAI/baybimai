import SetHtmlLang from "../set-html-lang";

// The root layout renders <html lang="en"> (English is the default locale).
// Every route under /zh corrects it to zh-CN for assistive tech and browser
// translate prompts.
export default function ChineseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SetHtmlLang lang="zh-CN" />
      {children}
    </>
  );
}

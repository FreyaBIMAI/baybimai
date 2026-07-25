import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baybimai.org"),
  title: "BAYBIMAI — 把 BIM 学到真正能用",
  description:
    "面向个人的 BIM 实战课程包，面向企业的定制培训与 BIM 审计服务。",
  icons: {
    // Versioned query string: Cloudflare's edge cache serves /favicon.svg by
    // URL, so bumping this value is what actually invalidates the icon for
    // visitors after an edit (there's no cache-purge scope on this token).
    icon: "/favicon.svg?v=3",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BAYBIMAI",
    description: "课程包 · 企业培训 · BIM 审计",
    url: "https://baybimai.org",
    siteName: "BAYBIMAI",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAYBIMAI",
    description: "把 BIM 学到真正能用。",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baybimai.org"),
  title: "BAYBIMAI — Building AI That Moves Ideas Forward",
  description:
    "BAYBIMAI 是一家 AI 产品与研究工作室，把人工智能变成清晰、可靠、真正有用的产品。",
  openGraph: {
    title: "BAYBIMAI",
    description: "Building AI that moves ideas forward.",
    url: "https://baybimai.org",
    siteName: "BAYBIMAI",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAYBIMAI",
    description: "Building AI that moves ideas forward.",
    images: ["/og.png"],
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

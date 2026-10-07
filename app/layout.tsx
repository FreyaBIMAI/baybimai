import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baybimai.org"),
  title: "BAYBIMAI — Learn BIM, Put It to Real Work",
  description:
    "Hands-on Revit courses for individuals, tailored enterprise BIM training, and independent BIM audits.",
  icons: {
    // Versioned query string: Cloudflare's edge cache serves /favicon.svg by
    // URL, so bumping this value is what actually invalidates the icon for
    // visitors after an edit (there's no cache-purge scope on this token).
    icon: "/favicon.svg?v=3",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BAYBIMAI",
    description: "Courses · Enterprise Training · BIM Consulting",
    url: "https://baybimai.org",
    siteName: "BAYBIMAI",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAYBIMAI",
    description: "Learn BIM, put it to real work.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

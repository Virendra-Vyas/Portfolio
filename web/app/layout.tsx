import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { site } from "@/content/site";
import { SkipLink } from "@/components/SkipLink/SkipLink";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import "./globals.css";

// Downloaded at build time and served from this site: the browser never contacts Google.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const MAIN_ID = "main";

// Absolute URLs for social previews need the production origin: content first, then the build environment.
const siteUrl = site.url ?? process.env.SITE_URL;

export const metadata: Metadata = {
  title: { default: `${site.name}, ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        openGraph: {
          type: "website",
          locale: "en_GB",
          siteName: site.name,
          images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
        },
        twitter: { card: "summary_large_image", images: ["/og.png"] },
      }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <SkipLink targetId={MAIN_ID} />
        <SiteHeader site={site} />
        <main id={MAIN_ID} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}

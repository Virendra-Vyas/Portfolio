import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/content/site";
import { SkipLink } from "@/components/SkipLink/SkipLink";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import "./globals.css";

// Downloaded at build time and served from this site: the browser never contacts Google.
// "optional" avoids a late re-paint of the large headline when the font arrives after first paint,
// which Lighthouse otherwise counts as the Largest Contentful Paint. The font is preloaded, so it is
// almost always ready in time; if not, the metric-matched fallback is used for that visit.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["wdth"],
  display: "optional",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "optional",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  // Only code samples use it, never the first screen, so it need not compete with the preloads above.
  preload: false,
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
    <html lang="en-GB" className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}>
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

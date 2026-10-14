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

export const metadata: Metadata = {
  title: { default: `${site.name}, ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileContactBar } from "@/components/layout/MobileContactBar";

/*
 * Typography system (approved specification):
 * - Source Serif 4 → display headings (used at weights 500–600 in CSS)
 * - Inter          → body/UI (used at weights 400–600 in CSS)
 * - IBM Plex Mono  → data labels (weights 400–500)
 * Source Serif 4 and Inter are variable fonts; IBM Plex Mono is pinned to 400/500.
 */
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap" });
const sourceSerif = localFont({ src: "./fonts/source-serif-4-latin-wght-normal.woff2", variable: "--font-source-serif", display: "swap" });
const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});
const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const DESCRIPTION =
  "Favour Tabugbo (FaveDigitals), on-chain data analyst. Stablecoin dashboards, exploit fund tracing and published research, built from public blockchain data.";

export const metadata: Metadata = {
  metadataBase: new URL("https://favedigitals.vercel.app"),
  title: {
    default: "Favour Tabugbo · On-chain data analyst",
    template: "%s · Favour Tabugbo",
  },
  description: DESCRIPTION,
  authors: [{ name: "Favour Tabugbo" }],
  creator: "FaveDigitals",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Favour Tabugbo · On-chain data analyst",
    description: DESCRIPTION,
    type: "website",
    siteName: "FaveDigitals",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@FaveDigitalsHQ",
    creator: "@FaveDigitalsHQ",
    title: "Favour Tabugbo · On-chain data analyst",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Synchronous theme initialization to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark")}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light")}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {/* Keyboard users can bypass the navigation. */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper-on-dark"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileContactBar />
      </body>
    </html>
  );
}
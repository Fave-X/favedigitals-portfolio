import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/*
 * Typography system (approved specification):
 * - Source Serif 4 → display headings (used at weights 500–600 in CSS)
 * - Inter          → body/UI (used at weights 400–600 in CSS)
 * - IBM Plex Mono  → data labels (weights 400–500)
 * Source Serif 4 and Inter are variable fonts; IBM Plex Mono is pinned to 400/500.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FaveDigitals: Web3 Data Analyst",
  description:
    "Portfolio of Favour Tabugbo (FaveDigitals), Web3 Data Analyst. On-chain data analysis, blockchain analytics dashboards and published Web3 research.",
  authors: [{ name: "Favour Tabugbo" }],
  creator: "FaveDigitals",
  robots: { index: true, follow: true },
  openGraph: {
    title: "FaveDigitals: Web3 Data Analyst",
    description:
      "I analyse blockchain data, investigate protocols, and publish useful insights. On-chain data analysis, analytics dashboards and published Web3 research.",
    type: "website",
    siteName: "FaveDigitals: Web3 Data Analyst",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@FaveDigitalsHQ",
    title: "FaveDigitals: Web3 Data Analyst",
    description:
      "On-chain data analysis, analytics dashboards and published Web3 research.",
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
      className={`${inter.variable} ${sourceSerif.variable} ${plexMono.variable}`}
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
      </body>
    </html>
  );
}
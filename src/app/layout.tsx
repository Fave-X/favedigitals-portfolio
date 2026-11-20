import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileContactBar } from "@/components/layout/MobileContactBar";

/*
 * Typography (The Case File):
 * - Archivo, condensed via its width axis: case titles and headlines
 * - Public Sans (the US government forms face): reading and interface
 * - Courier Prime: typed data only (amounts, hashes, case fields)
 * All self-hosted so builds never depend on a font CDN.
 */
const archivo = localFont({
  src: "./fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const publicSans = localFont({
  src: [
    { path: "./fonts/public-sans-latin-wght-normal.woff2", style: "normal" },
    { path: "./fonts/public-sans-latin-wght-italic.woff2", style: "italic" },
  ],
  variable: "--font-public-sans",
  display: "swap",
  weight: "100 900",
});
const courierPrime = localFont({
  src: [
    { path: "./fonts/courier-prime-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/courier-prime-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-courier-prime",
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
      data-theme="dark"
      className={`dark ${archivo.variable} ${publicSans.variable} ${courierPrime.variable}`}
    >
      <head>
        {/* Synchronous theme initialization to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark")}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light")}}catch(e){}})();`,
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
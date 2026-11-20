# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers, recruiters and compliance or analytics leads at crypto exchanges and blockchain analytics firms (for example VALR, OKX, Alpaca). They arrive from Favour's CV or application, usually on a laptop, with a few minutes to decide whether she can do AML, investigations or on-chain analytics work.

## Product Purpose

The portfolio of Favour Tabugbo, working as FaveDigitals, an on-chain data analyst and blockchain investigator based in Lagos (UTC+1). It exists to get her hired into remote crypto roles. Success: after one minute, the visitor believes she can trace money on-chain, finds things others missed, and backs every claim with published, checkable work; then they open a case study, download the CV or email her.

## Positioning

Investigator first, with proof. Her work is independent and fully public: every figure links to a published article or live dashboard, built from free public data, with the method and its limits written down. Her October 2026 trace of the Binance hack funds on Tron surfaced 9 receiving addresses absent from the FBI's published list.

## Operating Context

Visitors read the site alongside her CV and the job they are hiring for. They check claims by clicking through to Paragraph articles, Dune dashboards and live dashboards. Shared links appear in LinkedIn, X and Telegram previews.

## Capabilities and Constraints

- Next.js (App Router) on Vercel, deployed from GitHub (Fave-X/favedigitals-portfolio); Tailwind CSS v4; TypeScript.
- Pages: home (hero, work, about, contact) and one case-study page per project at /work/[slug].
- Features that must keep working: live stablecoin-by-chain data from DefiLlama with a dated fallback, filterable work index, case-study pages, CV download (public/cv), copy-email buttons, mobile contact bar, light and dark theme toggle, share image.
- Content lives in src/data/*.ts; all numbers there are sourced and must not change without a source.

## Brand Commitments

- Name: FaveDigitals. Her real name stays off the header and the hero; it may appear in the footer, About and metadata.
- The site stays dark by default (midnight base). Light mode remains available.
- Voice: plain, specific, evidence-led. No hype, no invented claims.

## Evidence on Hand

- Articles: "Following the Binance hack money on Tron" (Nov 2026), "Where stablecoins sit isn't where they move" (Nov 2026), "Revenue defensibility for stablecoins" (Aug 2026), all on paragraph.com/@favedigitals.
- Dashboards: Dollar Rails (dollar-rails.vercel.app), ADI Chain Live Dashboard, ADI Chain Overview and L0st N F0und on Dune.
- Screen recordings and screenshots in public/media and public/projects; portrait in public/images.
- CV PDF in public/cv.
- Absent and not to be invented: testimonials, employer logos, client names, awards, follower counts. Findings for ADI Chain Overview and L0st N F0und are pending a Dune run.

## Product Principles

1. Prove, don't claim: every number is clickable back to its source.
2. Lead with the investigation; dashboards and research support it.
3. Say what the data cannot show.
4. One click to contact or download the CV from anywhere.

## Accessibility & Inclusion

WCAG AA contrast in both themes; respect reduced motion; keyboard reachable; works on mobile data in Nigeria (keep pages light).

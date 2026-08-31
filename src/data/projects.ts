import type { Project } from "@/lib/types";

/**
 * Featured projects (knowledge.md §5 + owner-supplied media (screen recordings
 * + screenshots) and approved wording from Stage 5). Titles, URLs, platforms
 * and categories are factual; descriptions are the approved factual
 * restatements only  -  no findings, metrics or outcomes (knowledge.md §17,
 * §29). Future projects: append an entry.
 *
 * Note: Project 2's title "ADI Chain Live Analytics Dashboard" was explicitly
 * chosen by the portfolio owner in Stage 5 (supersedes knowledge.md §5 wording).
 * Project 3 classification "NFT Collection" is an owner-supplied fact: L0st
 * N F0und (LNF0) is an NFT collection.
 *
 * Video note: the owner-supplied MP4s live in public/media/ as
 * ADI-chain-overview.mp4, ADI-live-dashboard.mp4 and
 * L0st-N-F0und-(LNF0).mp4 (renamed from a pre-existing ".mp4.mp4" double
 * extension). Reference these exact filenames; do not rename again.
 */
export const PROJECTS: Project[] = [
  {
    id: "adi-chain-overview",
    index: "01",
    title: "ADI Chain Overview",
    url: "https://dune.com/favedigitals/adi-chain-overview",
    platform: "Dune Analytics",
    category: "On-Chain Analytics",
    description: "An on-chain overview of ADI Chain, published on Dune Analytics.",
    media: {
      type: "video",
      src: "/media/ADI-chain-overview.mp4",
      poster: "/projects/adi-chain-overview.png",
      alt: "ADI Chain Overview analytics dashboard",
      width: 1920,
      height: 1008,
    },
  },
  {
    id: "adi-chain-analytics-dashboard",
    index: "02",
    title: "ADI Chain Live Analytics Dashboard",
    url: "https://adi-dashboard-sandy.vercel.app/",
    category: "On-Chain Analytics / Data Dashboard",
    description: "An on-chain analytics dashboard for ADI Chain.",
    media: {
      type: "video",
      src: "/media/ADI-live-dashboard.mp4",
      poster: "/projects/adi-chain-live-dashboard.png",
      alt: "ADI Chain analytics dashboard",
      width: 1920,
      height: 1008,
    },
  },
  {
    id: "l0st-n-f0und",
    index: "03",
    title: "L0st n F0und: Complete On-Chain Analytics",
    url: "https://dune.com/favedigitals/l0st-n-f0und-lnf0-complete-on-chain-analytics",
    platform: "Dune Analytics",
    // Owner-supplied classification: L0st N F0und (LNF0) is an NFT collection.
    category: "NFT Collection",
    description: "A complete on-chain analytics study of L0st n F0und, published on Dune Analytics.",
    media: {
      type: "video",
      src: "/media/L0st-N-F0und-(LNF0).mp4",
      poster: "/projects/l0st-n-found.png",
      alt: "L0st n F0und complete on-chain analytics dashboard",
      width: 1920,
      height: 1008,
    },
  },
];
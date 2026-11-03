import type { ResearchItem } from "@/lib/types";

/**
 * Published research (knowledge.md §7/§20), newest first. Factual metadata and
 * an owner-approved note only. No dates, views, citations, rankings or
 * financial claims (§7, §29). Future items: add an entry at the top.
 *
 * Items with an empty `url` are not rendered, so an article can be added here
 * before it is published and appears once its Paragraph link is filled in.
 */
export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "dollar-rails-stablecoin-article",
    title: "Where stablecoins sit isn't where they move",
    url: "https://paragraph.com/@favedigitals/where-stable-coins-sit-isnt-where-they-move",
    platform: "Paragraph",
    category: "Web3 Research / Stablecoins",
    note: "An article on what the Dollar Rails dashboard shows about where stablecoins are held and where payment-sized transfers happen.",
  },
  {
    id: "following-the-binance-hack-money-on-tron",
    title: "Following the Binance hack money on Tron",
    url: "https://paragraph.com/@favedigitals/following-the-binance-hack-money-on-tron",
    platform: "Paragraph",
    category: "On-Chain Investigation / Tron",
    note: "A transaction-by-transaction trace of funds from the October 2026 Binance hack across Tron, built from public blockchain data.",
  },
  {
    id: "revenue-defensibility-for-stablecoin",
    title: "Revenue Defensibility for Stablecoin",
    url: "https://paragraph.com/@favedigitals/revenue-defensibility-for-stablecoin",
    platform: "Paragraph",
    category: "Web3 Research / Stablecoins",
    note: "An article on revenue defensibility in stablecoins.",
  },
];

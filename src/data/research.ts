import type { ResearchItem } from "@/lib/types";

/**
 * Published research (knowledge.md §7/§20). Exactly one item with factual
 * metadata and the approved note. No dates, views, citations, rankings,
 * findings, or financial claims (§7, §29). Future items: append an entry.
 */
export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "revenue-defensibility-for-stablecoin",
    title: "Revenue Defensibility for Stablecoin",
    url: "https://paragraph.com/@favedigitals/revenue-defensibility-for-stablecoin",
    platform: "Paragraph",
    category: "Web3 Research / Stablecoins",
    note: "An article on revenue defensibility in stablecoins.",
  },
];
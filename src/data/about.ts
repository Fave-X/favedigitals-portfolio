import type { TimelineEntry, ToolProof } from "@/lib/types";

export const ABOUT_COPY: string[] = [
  "I'm Favour, an on-chain data analyst working as FaveDigitals. I build dashboards and investigations from public blockchain data, and I publish how I got each number and where the data runs out.",
  "My background is in lab analysis, so I work the same way on-chain: state the question, document the method, cross-check every figure that can be checked, and say plainly what the data cannot show.",
];

/** Web3 timeline. Years are owner-stated. */
export const TIMELINE: TimelineEntry[] = [
  {
    when: "2026",
    what: "Analytics and published research",
    detail: "Dollar Rails, the Binance-hack trace on Tron, ADI Chain dashboards and stablecoin research on Paragraph.",
  },
  {
    when: "2025",
    what: "Co-organiser, BlockFest Africa",
    detail: "Helped run one of Africa's large-scale Web3 conferences.",
  },
  {
    when: "2023 →",
    what: "Protocol testing and community support",
    detail: "Tested 50+ DeFi, Layer 2 and AI protocols including zkSync, Starknet, t3rn, XION and Somnia, and supported users of Union, Somnia and other testnets.",
  },
];

/** Each tool is listed with the work that shows it in use. */
export const TOOL_PROOF: ToolProof[] = [
  { tool: "SQL (DuneSQL)", proof: ["l0st-n-f0und", "adi-chain-overview"] },
  { tool: "Dune Analytics", proof: ["l0st-n-f0und", "adi-chain-overview"] },
  { tool: "DefiLlama, CoinGecko APIs", proof: ["dollar-rails", "adi-chain-live-dashboard"] },
  { tool: "Blockscout, Tronscan, public RPC", proof: ["dollar-rails", "adi-chain-live-dashboard"] },
  { tool: "TronGrid, THORChain data", proof: ["binance-hack-tron-trace"] },
  { tool: "React, Vite, Chart.js, Tailwind", proof: ["adi-chain-live-dashboard"] },
  { tool: "Research writing", proof: ["stablecoin-revenue-defensibility", "dollar-rails", "binance-hack-tron-trace"] },
];

/** Tools Favour lists but no published project shows yet. */
export const ALSO_USES = ["Python", "Power BI", "Arkham", "Glassnode"];

import type { JourneyStage } from "@/lib/types";

/**
 * Web3 Journey (knowledge.md §4/§19): protocol testing → on-chain data
 * analytics → research & published insights. Each stage holds factual points
 * only  -  no dates, employers, protocol counts, numbers, specific results or
 * unrelated (non-Web3) background (§4, §29).
 */
export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "protocol-testing",
    label: "STAGE 01: PROTOCOL TESTING",
    title: "Protocol Testing",
    points: [
      "Interacted with DeFi, blockchain and AI x Web3 protocols.",
      "Tested functionality and explored protocol features.",
      "Provided constructive feedback focused on user experience.",
    ],
  },
  {
    id: "on-chain-data-analytics",
    label: "STAGE 02: ON-CHAIN DATA ANALYTICS",
    title: "On-Chain Data Analytics",
    points: [
      "Analyses on-chain and protocol data.",
      "Builds dashboards on Dune Analytics.",
    ],
  },
  {
    id: "research-published-insights",
    label: "STAGE 03: RESEARCH & PUBLISHED INSIGHTS",
    title: "Research & Published Insights",
    points: [
      "Publishes Web3 research on Paragraph.",
      "Stablecoin research published.",
      "On-chain investigation published.",
    ],
  },
];
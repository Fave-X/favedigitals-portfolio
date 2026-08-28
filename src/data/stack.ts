import type { StackGroup } from "@/lib/types";

/**
 * Analytical stack (knowledge.md §8/§18 — the exact groups and tools specified).
 * Factual list only: no percentages, proficiency levels, years, ratings, bars,
 * badges, logos or invented tools.
 */
export const STACK_GROUPS: StackGroup[] = [
  {
    id: "data-analysis",
    label: "Data Analysis",
    items: ["SQL", "Python", "On-chain data analysis"],
  },
  {
    id: "on-chain-analytics",
    label: "On-Chain Analytics",
    items: [
      "Dune Analytics",
      "Blockscout",
      "Arkham",
      "Glassnode",
      "Protocol analytics",
      "Blockchain analytics",
    ],
  },
  {
    id: "visualization-development",
    label: "Visualization & Development",
    items: ["Power BI", "Git", "GitHub", "Data visualization"],
  },
];
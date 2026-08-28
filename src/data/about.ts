/**
 * About section data (knowledge.md §1, §2, §4, §21). Facts and copy are
 * strictly Web3/on-chain — no dates, years, employers, statistics, or any
 * non-Web3 background (§21, §29).
 */
export const ABOUT_FACTS: { label: string; value: string }[] = [
  { label: "Name", value: "Favour Tabugbo" },
  { label: "Portfolio identity", value: "FaveDigitals" },
  { label: "Role", value: "Web3 Data Analyst" },
  { label: "Dashboards", value: "Dune Analytics" },
  { label: "Writing", value: "Paragraph" },
];

/** About paragraphs, derived strictly from the established positioning. */
export const ABOUT_COPY: string[] = [
  "Favour Tabugbo operates publicly through the FaveDigitals identity.",
  "The journey began with protocol testing across DeFi, blockchain and AI x Web3 protocols — interacting with protocols, exploring their functionality and providing constructive feedback around product and user experience.",
  "The focus then transitioned toward on-chain data analytics. Today the work centres on analysing on-chain and protocol data, building dashboards and publishing Web3 insights.",
  "Research and writing are published through Paragraph.",
];

/** Positioning statement (knowledge.md §2) — shown as a restrained pull quote. */
export const ABOUT_STATEMENT = "I analyse On-Chain Data and I publish insights.";
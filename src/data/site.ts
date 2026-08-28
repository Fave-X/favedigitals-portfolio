import type { SiteIdentity } from "@/lib/types";

/**
 * Core identity facts (knowledge.md §1, §2 and the approved hero toolkit strip).
 * Single source for hero, nav and footer — no duplicated identity strings,
 * nothing invented (knowledge.md §29).
 */
export const SITE_IDENTITY: SiteIdentity = {
  name: "Favour Tabugbo",
  brand: "FaveDigitals",
  role: "Web3 Data Analyst",
  statement: "I analyse On-Chain Data and I publish insights.",
  toolkit: ["Dune Analytics", "Paragraph", "Power BI", "SQL", "Python"],
};
import type { SiteIdentity } from "@/lib/types";

/**
 * Core identity facts (knowledge.md §1, §2 and the owner-approved hero copy).
 * Single source for hero, nav and footer  -  no duplicated identity strings,
 * nothing invented (knowledge.md §29).
 */
export const SITE_IDENTITY: SiteIdentity = {
  name: "Favour Tabugbo",
  brand: "FaveDigitals",
  role: "Web3 Data Analyst",
  statement: "I analyse blockchain data, investigate protocols, and publish useful insights.",
  supporting:
    "My work spans across analytics, research and data dashboards that help teams understand protocol behavior and user trends.",
  toolkit: ["Dune Analytics", "Paragraph", "Power BI", "SQL", "Python"],
};
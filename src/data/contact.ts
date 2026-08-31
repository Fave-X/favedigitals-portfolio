import type { ContactChannel } from "@/lib/types";

/**
 * Contact channels (knowledge.md §22)  -  owner-confirmed public channels only.
 * No invented accounts, no contact form, no fabricated information.
 */
export const CONTACT_POSITIONING =
  "For collaborations and on-chain analytics work, reach FaveDigitals through the channels listed here.";

/** Icon links. Email uses mailto: and opens in the same tab; the rest open in a new tab. */
export const SOCIAL_CHANNELS: ContactChannel[] = [
  { id: "x", label: "Twitter/X", href: "https://x.com/FaveDigitalsHQ", kind: "external" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/favour-tabugbo-a9555b200/",
    kind: "external",
  },
  { id: "telegram", label: "Telegram", href: "https://t.me/FaveDigitals", kind: "external" },
  { id: "github", label: "GitHub", href: "https://github.com/Fave-X", kind: "external" },
  { id: "email", label: "Email", href: "mailto:favourtabugbo@gmail.com", kind: "email" },
];

/** Deliberate analytics/publishing channel text links (not oversized buttons). */
export const PROFILE_CHANNELS: ContactChannel[] = [
  { id: "dune", label: "Dune Analytics", href: "https://dune.com/favedigitals", kind: "external" },
  {
    id: "paragraph",
    label: "Paragraph",
    href: "https://paragraph.com/@favedigitals",
    kind: "external",
  },
];
import type { ContactChannel } from "@/lib/types";

/** Owner-confirmed public channels only. */
export const CHANNELS: ContactChannel[] = [
  { id: "email", label: "Email", handle: "favourtabugbo@gmail.com", href: "mailto:favourtabugbo@gmail.com", kind: "email" },
  { id: "linkedin", label: "LinkedIn", handle: "favour-tabugbo", href: "https://www.linkedin.com/in/favour-tabugbo-a9555b200/", kind: "external" },
  { id: "x", label: "X", handle: "@FaveDigitalsHQ", href: "https://x.com/FaveDigitalsHQ", kind: "external" },
  { id: "telegram", label: "Telegram", handle: "@FaveDigitals", href: "https://t.me/FaveDigitals", kind: "external" },
  { id: "github", label: "GitHub", handle: "Fave-X", href: "https://github.com/Fave-X", kind: "external" },
  { id: "dune", label: "Dune", handle: "favedigitals", href: "https://dune.com/favedigitals", kind: "external" },
  { id: "paragraph", label: "Paragraph", handle: "@favedigitals", href: "https://paragraph.com/@favedigitals", kind: "external" },
];

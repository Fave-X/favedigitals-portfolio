import type { NavLink } from "@/lib/types";

/** Primary navigation. Root-relative so it works from case-study pages too. */
export const NAV_LINKS: NavLink[] = [
  { id: "work", label: "Exhibits", href: "/#work" },
  { id: "about", label: "Profile", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

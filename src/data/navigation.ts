import type { NavLink } from "@/lib/types";

/** Primary navigation. Root-relative so it works from case-study pages too. */
export const NAV_LINKS: NavLink[] = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

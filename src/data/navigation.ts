import type { NavLink } from "@/lib/types";

/**
 * Primary navigation (knowledge.md §15  -  exact labels and order, exact anchors).
 * Single source for both the desktop bar and the mobile sheet.
 */
export const NAV_LINKS: NavLink[] = [
  { id: "work", label: "Work", href: "#work" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "research", label: "Research", href: "#research" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];
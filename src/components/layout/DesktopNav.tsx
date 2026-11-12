"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/navigation";

/**
 * Desktop navigation with scroll-spy.
 *
 * Client-side JavaScript is isolated to this component  -  the links themselves
 * are plain anchors and keep working without JavaScript. The scroll-spy only
 * adds the visual active state; it never interferes with anchor navigation.
 * Sections that do not exist yet are simply skipped.
 */
export function DesktopNav({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // Consider a section active while it crosses the middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex h-16 items-stretch gap-7">
        {NAV_LINKS.map((link) => {
          const isActive = activeId === link.id;

          return (
            <li key={link.id} className="flex items-stretch">
              <a
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center text-[15px] transition-colors duration-200 ${
                  isActive
                    ? "text-accent underline decoration-accent decoration-2 underline-offset-[6px]"
                    : "no-underline text-ink-2 hover:text-accent focus-visible:text-accent"
                }`}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
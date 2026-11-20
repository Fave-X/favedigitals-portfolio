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
      <ul className="flex items-end gap-1">
        {NAV_LINKS.map((link) => {
          const isActive = activeId === link.id;
          return (
            <li key={link.id}>
              <a
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative -mb-px flex h-11 items-center rounded-t-[4px] border border-b-0 px-4 text-[15px] font-semibold no-underline transition-colors duration-150 ${
                  isActive
                    ? "border-line-strong bg-surface text-ink"
                    : "border-transparent text-accent hover:bg-accent-mist"
                }`}
              >
                {isActive ? <span aria-hidden="true" className="absolute inset-x-3 top-0 h-[3px] bg-accent" /> : null}
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

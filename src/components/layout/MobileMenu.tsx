"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";

/**
 * Mobile navigation sheet (<768px).
 *
 * Full-screen, solid paper  -  no blur, no gradient, no decorative effects.
 * Opens/closes instantly (no animation), so it is fully usable with
 * reduced motion enabled. Handles Escape-to-close, focus return, a simple
 * focus trap while open, and body scroll locking.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Capture the trigger element now  -  refs may change by cleanup time.
    const triggerElement = triggerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) return;

      const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerElement?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
        className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {open ? (
        <div
          ref={sheetRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-paper"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-6">
            <span className="text-[17px] font-semibold text-ink">FaveDigitals</span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center text-ink"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="divide-y divide-line">
              {NAV_LINKS.map((link, position) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="no-underline flex items-baseline gap-4 py-4"
                  >
                    <span className="mono-label text-muted">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[2rem] leading-tight text-accent">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
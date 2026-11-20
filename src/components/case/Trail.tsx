"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TRAIL } from "@/components/case/trail-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  /**
   * "load": the red pen traces the trail once when the page opens (home).
   * "scroll": the red pen follows the reader down the trail (case page).
   */
  trace: "load" | "scroll";
  /** Vertical everywhere (case page), or horizontal from md up (home). */
  layout?: "responsive" | "vertical";
};

/**
 * The money trail as a chain of hops. The grey trail is always visible;
 * a red-pen line traces it on top, driven by one CSS variable (--trace)
 * so the same tween draws the horizontal and the vertical line.
 * With reduced motion, or before JavaScript runs, the trace is complete.
 */
export function Trail({ trace, layout = "responsive" }: Props) {
  const root = useRef<HTMLOListElement>(null);
  const horizontal = layout === "responsive";

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (trace === "load") {
        gsap.fromTo(
          el,
          { "--trace": 0 },
          { "--trace": 1, duration: 1.6, delay: 0.25, ease: "expo.out" },
        );
        gsap.fromTo(
          el.querySelectorAll("[data-node]"),
          { "--hit": 0 },
          { "--hit": 1, duration: 0.25, ease: "power2.out", stagger: 0.14, delay: 0.3 },
        );
      } else {
        gsap.fromTo(
          el,
          { "--trace": 0 },
          {
            "--trace": 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 55%", scrub: 0.4 },
          },
        );
        el.querySelectorAll<HTMLElement>("[data-node]").forEach((node) => {
          gsap.fromTo(
            node,
            { "--hit": 0 },
            {
              "--hit": 1,
              duration: 0.2,
              scrollTrigger: { trigger: node, start: "top 62%", toggleActions: "play none none reverse" },
            },
          );
        });
      }
    },
    { scope: root, dependencies: [trace] },
  );

  const last = TRAIL.length - 1;

  return (
    <ol
      ref={root}
      style={{ "--trace": 1 } as React.CSSProperties}
      className={`relative grid gap-0 ${horizontal ? "md:grid-cols-6" : ""}`}
      aria-label="Money trail, from Binance's wallet to the exit"
    >
      {/* Grey trail (always visible) and the red-pen trace over it. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[11px] top-3 bottom-6 w-px border-l border-dashed border-line-strong ${
          horizontal ? "md:left-3 md:right-[8%] md:top-[11px] md:bottom-auto md:h-px md:w-auto md:border-l-0 md:border-t" : ""
        }`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[10px] top-3 bottom-6 w-[3px] origin-top bg-accent [transform:scaleY(var(--trace))] ${
          horizontal
            ? "md:left-3 md:right-[8%] md:top-[10px] md:bottom-auto md:h-[3px] md:w-auto md:origin-left md:[transform:scaleX(var(--trace))]"
            : ""
        }`}
      />

      {TRAIL.map((hop, index) => {
        const isEnd = index === last;
        return (
          <li
            key={hop.wallet}
            className={`relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-8 last:pb-0 ${
              horizontal ? "md:block md:pr-5 md:pb-0" : ""
            }`}
          >
            <span
              data-node
              aria-hidden="true"
              style={{ "--hit": 1 } as React.CSSProperties}
              className={`relative z-10 mt-0.5 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 bg-paper typed text-[11px] font-bold ${
                isEnd
                  ? "border-accent text-accent [box-shadow:0_0_0_calc(var(--hit)*3px)_var(--color-paper),0_0_0_calc(var(--hit)*4.5px)_color-mix(in_srgb,var(--color-accent)_calc(var(--hit)*100%),transparent)]"
                  : "border-line-strong text-ink-2 [box-shadow:0_0_0_calc(var(--hit)*3px)_var(--color-paper),0_0_0_calc(var(--hit)*4.5px)_color-mix(in_srgb,var(--color-ink-2)_calc(var(--hit)*55%),transparent)]"
              }`}
            >
              {index + 1}
            </span>
            <div className={`min-w-0 ${horizontal ? "md:mt-5" : ""}`}>
              <p className="typed text-[12.5px] text-muted">{hop.wallet}</p>
              <p className="mt-0.5 font-semibold leading-snug text-ink">{hop.role}</p>
              <p className="mt-1 text-[14.5px] leading-snug text-ink-2">{hop.move}</p>
              {hop.note && !horizontal ? <p className="mt-1.5 text-[14px] text-muted">{hop.note}</p> : null}
              {hop.finding ? (
                <p className="mt-3 inline-block rounded-[50%/45%] border-2 border-accent px-6 py-2.5 text-[14.5px] font-semibold leading-snug text-ink [transform:rotate(-1.5deg)]">
                  {hop.finding}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

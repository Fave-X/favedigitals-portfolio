import { SectionShell } from "@/components/layout/SectionShell";
import { Hairline } from "@/components/ui/Hairline";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { ArrowRight } from "lucide-react";
import { JOURNEY_STAGES } from "@/data/journey";

/**
 * Web3 Journey (knowledge.md §19): three factual stages with a restrained
 * connecting arrow on desktop (grid) and a vertical timeline on mobile/tablet.
 * No dates, numbers, employers, or invented results. Static server component.
 */
export function Web3Journey() {
  return (
    <SectionShell
      id="journey"
      index="03"
      eyebrow="WEB3 JOURNEY"
      title="Web3 Journey"
      lede="From protocol testing to on-chain analytics and published research."
    >
      {/* Desktop: three equal columns with a restrained arrow between them (≥1024px) */}
      <div className="hidden grid-cols-1 items-stretch gap-0 lg:grid lg:grid-cols-3">
        {JOURNEY_STAGES.map((stage, index) => (
          <div key={stage.id} className="flex items-start">
            {index > 0 ? (
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="mt-1 shrink-0 text-accent lg:mx-3"
              />
            ) : null}
            <div className="flex-1 border-t border-line pt-5">
              <MonoLabel tone="accent">{stage.label}</MonoLabel>
              <h3 className="mt-3 font-serif text-2xl tracking-[-0.01em] text-ink">{stage.title}</h3>
              <Hairline className="mt-4" />
              <ul className="mt-4 space-y-3">
                {stage.points.map((point) => (
                  <li key={point} className="text-[15px] leading-relaxed text-ink-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <ol className="relative space-y-10 lg:hidden">
        {JOURNEY_STAGES.map((stage) => (
          <li key={stage.id} className="relative border-l border-line pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-accent"
            />
            <MonoLabel tone="accent">{stage.label}</MonoLabel>
            <h3 className="mt-2 font-serif text-2xl tracking-[-0.01em] text-ink">{stage.title}</h3>
            <ul className="mt-3 space-y-2">
              {stage.points.map((point) => (
                <li key={point} className="text-[15px] leading-relaxed text-ink-2">
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
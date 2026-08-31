import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { RESEARCH_ITEMS } from "@/data/research";

/**
 * Research & Insights (knowledge.md §20)  -  citation/editorial style, visually
 * distinct from the dashboard projects via a tinted (accent-soft) full-width
 * band with hairline top/bottom borders. Content stays in the standard
 * container. No card treatments, no invented article metadata.
 */
export function ResearchInsights() {
  const item = RESEARCH_ITEMS[0];

  return (
    <SectionShell
      id="research"
      index="04"
      eyebrow="RESEARCH & INSIGHTS"
      title="Research & Insights"
      lede="Published Web3 research and writing."
      tone="tint"
    >
      {item ? (
        <div className="border-t border-accent/20 pt-8">
          <MonoLabel tone="accent">{`PUBLICATION: ${item.platform}`}</MonoLabel>

          <h3 className="mt-4 max-w-[30ch] font-serif font-semibold italic tracking-[-0.01em] text-h3 text-ink">
            {item.title}
          </h3>

          <MonoLabel tone="secondary" className="mt-4">{item.category}</MonoLabel>

          {item.note ? <p className="mt-3 max-w-[60ch] text-ink-2">{item.note}</p> : null}

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline mono-label mt-6 inline-flex items-center gap-1.5 py-2.5 -my-2.5 text-accent transition-colors duration-200 hover:text-ink-2"
          >
            {`Read on ${new URL(item.url).hostname.replace("www.", "")} `}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </SectionShell>
  );
}
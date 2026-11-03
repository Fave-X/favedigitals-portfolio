import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { RESEARCH_ITEMS } from "@/data/research";
import type { ResearchItem } from "@/lib/types";

/**
 * Research & Insights (knowledge.md §20)  -  citation/editorial style, visually
 * distinct from the dashboard projects via a tinted (accent-soft) full-width
 * band with hairline top/bottom borders. Content stays in the standard
 * container. No card treatments, no invented article metadata.
 */
function ResearchEntry({ item }: { item: ResearchItem }) {
  return (
    <li className="border-t border-accent/20 pt-8">
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
        aria-label={`${item.title}, read on ${item.platform} (opens in a new tab)`}
        className="no-underline mono-label mt-6 inline-flex items-center gap-1.5 py-2.5 -my-2.5 text-accent transition-colors duration-200 hover:text-accent-deep"
      >
        {`Read on ${new URL(item.url).hostname.replace("www.", "")} `}
        <ArrowUpRight size={14} aria-hidden="true" className="arrow-shift" />
      </a>
    </li>
  );
}

export function ResearchInsights() {
  // Unpublished entries (empty url) stay hidden until their link is added.
  const items = RESEARCH_ITEMS.filter((item) => item.url.trim() !== "");

  return (
    <SectionShell
      id="research"
      eyebrow="RESEARCH & INSIGHTS"
      title="Research & Insights"
      lede="Published Web3 research and writing."
      tone="tint"
    >
      {items.length > 0 ? (
        <ul className="flex flex-col gap-12 md:gap-14">
          {items.map((item) => (
            <ResearchEntry key={item.id} item={item} />
          ))}
        </ul>
      ) : null}
    </SectionShell>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WorkItem, WorkKind } from "@/lib/types";
import { WORK_KINDS, workKinds } from "@/data/work";
import { WorkPreview } from "@/components/work/WorkPreview";

type Filter = "All" | WorkKind;

const PLURAL: Record<Filter, string> = {
  All: "All",
  Dashboard: "Dashboards",
  Investigation: "Investigations",
  Research: "Research",
};

/**
 * Filterable index of all work. On wide screens, hovering or focusing a row
 * swaps the preview pane on the right; on phones each row shows its own
 * thumbnail instead.
 */
export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { All: items.length, Dashboard: 0, Investigation: 0, Research: 0 };
    items.forEach((item) => workKinds(item).forEach((kind) => (result[kind] += 1)));
    return result;
  }, [items]);

  const visible = filter === "All" ? items : items.filter((item) => workKinds(item).includes(filter));
  const previewItem = visible.find((item) => item.slug === hovered) ?? visible[0];

  return (
    <div>
      <div role="group" aria-label="Filter work by type" className="flex flex-wrap gap-2">
        {(["All", ...WORK_KINDS] as Filter[]).map((option) => {
          const selected = filter === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setFilter(option);
                setHovered(null);
              }}
              className={`inline-flex min-h-10 items-center gap-2 border px-4 text-[14px] transition-colors duration-150 ${
                selected
                  ? "border-accent bg-accent text-paper"
                  : "border-line text-ink-2 hover:border-accent hover:text-accent"
              }`}
            >
              {PLURAL[option]}
              <span className={`font-mono text-[12px] ${selected ? "opacity-70" : "text-muted"}`}>{counts[option]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <ul className="border-t border-line lg:col-span-7" aria-live="polite">
          {visible.map((item) => {
            const isPreviewed = previewItem?.slug === item.slug;
            return (
              <li key={item.slug} className="border-b border-line">
                <Link
                  href={`/work/${item.slug}`}
                  onMouseEnter={() => setHovered(item.slug)}
                  onFocus={() => setHovered(item.slug)}
                  className={`no-underline group grid grid-cols-1 gap-4 py-6 transition-colors duration-150 sm:grid-cols-[5.5rem_1fr] lg:px-3 ${
                    isPreviewed ? "lg:bg-accent-mist" : ""
                  }`}
                >
                  <p className="mono-label text-muted">{item.date}</p>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-serif text-[1.35rem] font-semibold leading-snug text-ink decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                        {item.title}
                      </h3>
                      <span className="mono-label text-[11px] text-muted">{workKinds(item).join(" · ")}</span>
                    </div>
                    <p className="mt-2 max-w-[60ch] text-[15px] text-ink-2">{item.keyFinding ?? item.summary}</p>
                    <p className="mt-3 font-mono text-[12px] text-muted">{item.tools.slice(0, 4).join(" / ")}</p>
                    <div className="mt-4 overflow-hidden border border-line lg:hidden">
                      <WorkPreview item={item} />
                    </div>
                    <span className="mono-label mt-4 inline-flex items-center gap-1.5 text-accent">
                      Case study
                      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:col-span-5 lg:block">
          {previewItem ? (
            <div className="sticky top-24">
              <div className="overflow-hidden border border-line">
                <WorkPreview item={previewItem} />
              </div>
              <p className="mono-label mt-3 text-muted">{previewItem.topic}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

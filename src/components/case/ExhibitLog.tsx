"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, LayoutGroup } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { WorkItem, WorkKind } from "@/lib/types";
import { WORK_KINDS, exhibitLetter, workKinds } from "@/data/work";
import { formatBillions, useStablecoinChains } from "@/lib/stablecoin-chains";

type Filter = "All" | WorkKind;
const TAB_LABEL: Record<Filter, string> = {
  All: "All exhibits",
  Dashboard: "Dashboards",
  Investigation: "Investigations",
  Research: "Research",
};


function status(item: WorkItem) {
  const live = item.links.some((link) => /vercel\.app/.test(link.href));
  return live ? "Live" : "Published";
}

/** Today's reading from the Dollar Rails data source, on the Dollar Rails exhibit. */
function LiveReading() {
  const data = useStablecoinChains();
  const share = ((data.chains[0].billions + data.chains[1].billions) / data.totalBillions) * 100;
  return (
    <p className="mt-3 text-[14.5px] text-ink-2">
      <span className="field mr-2">{data.status === "live" ? "Reading today" : `Reading ${data.asOf}`}</span>
      <span className="typed text-ink">{formatBillions(data.totalBillions)}</span> in stablecoins,{" "}
      <span className="typed text-ink">{share.toFixed(0)}%</span> on Ethereum and Tron (DefiLlama)
    </p>
  );
}

/**
 * The file's exhibit log: folder tabs filter it, each row is one exhibit
 * with its finding, its evidence and a status stamp. Rows are links.
 */
export function ExhibitLog({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const counts = useMemo(() => {
    const result: Record<Filter, number> = { All: items.length, Dashboard: 0, Investigation: 0, Research: 0 };
    items.forEach((item) => workKinds(item).forEach((kind) => (result[kind] += 1)));
    return result;
  }, [items]);

  const rows = items
    .map((item, index) => ({ item, letter: exhibitLetter(index) }))
    .filter(({ item }) => filter === "All" || workKinds(item).includes(filter));

  return (
    <div>
      <LayoutGroup>
        <div role="group" aria-label="Filter exhibits" className="flex flex-wrap items-end gap-1 border-b border-line-strong">
          {(["All", ...WORK_KINDS] as Filter[]).map((option) => {
            const selected = filter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(option)}
                className={`relative -mb-px flex min-h-11 items-center gap-2 rounded-t-[4px] border border-b-0 px-4 text-[14.5px] font-semibold transition-colors duration-150 ${
                  selected
                    ? "border-line-strong bg-surface text-ink"
                    : "border-transparent text-accent hover:bg-accent-mist"
                }`}
              >
                {TAB_LABEL[option]}
                <span className="typed text-[12px] text-muted">{counts[option]}</span>
                {selected ? (
                  <motion.span
                    layoutId="tab-pen"
                    aria-hidden="true"
                    className="absolute inset-x-3 top-0 h-[3px] bg-accent"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <ol className="border-x border-b border-line-strong bg-surface">
        {rows.map(({ item, letter }) => (
          <li key={item.slug} className="border-b border-line last:border-b-0">
            <motion.div initial={false} whileHover="hover" className="relative">
              <Link
                href={`/work/${item.slug}`}
                className="group grid grid-cols-1 gap-x-8 gap-y-4 px-5 py-7 text-ink no-underline transition-colors duration-150 hover:bg-accent-mist md:grid-cols-[7.5rem_1fr_15rem] md:px-7"
              >
                <div className="flex items-start gap-3 md:flex-col md:gap-2">
                  <span className="exhibit-tag">Exhibit {letter}</span>
                  <span className="typed text-[13px] text-muted">{item.date}</span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
                    <span className="stamp">{status(item)}</span>
                  </div>
                  <p className="mt-2 max-w-[64ch] text-[15.5px] text-ink-2">{item.keyFinding ?? item.summary}</p>
                  {item.slug === "dollar-rails" ? <LiveReading /> : null}
                  <p className="mt-3 text-[13.5px] text-muted">
                    <span className="field mr-2">Evidence</span>
                    {item.tools.slice(0, 5).join(", ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent">
                    Open the case
                    <motion.span variants={{ hover: { x: 4 } }} transition={{ duration: 0.15 }} className="inline-flex">
                      <ArrowRight size={16} aria-hidden="true" />
                    </motion.span>
                  </span>
                </div>

                {item.media ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.media.poster}
                    alt=""
                    width={item.media.width}
                    height={item.media.height}
                    loading="lazy"
                    className="hidden w-full self-start border border-line md:block"
                  />
                ) : (
                  <span className="hidden md:block" />
                )}
              </Link>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { formatBillions, useStablecoinChains } from "@/lib/stablecoin-chains";

const SupplyConstellation = dynamic(
  () => import("@/components/ui/SupplyConstellation").then((mod) => mod.SupplyConstellation),
  { ssr: false },
);

/**
 * The hero's live data panel: where the world's stablecoin supply sits, by
 * chain. The 3D view and the legend show the same numbers; hovering either
 * highlights the chain in both.
 */
export function HeroSupply() {
  const data = useStablecoinChains();
  const [active, setActive] = useState<number | null>(null);
  const [show3d, setShow3d] = useState(false);

  // Mount the 3D view after the page is idle so it never delays first paint.
  useEffect(() => {
    const start = () => setShow3d(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  const topTwoShare = ((data.chains[0].billions + data.chains[1].billions) / data.totalBillions) * 100;
  const activeChain = active === null ? null : data.chains[active];

  return (
    <figure className="border border-line bg-surface">
      <figcaption className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="mono-label text-muted">Where digital dollars sit</p>
          <p className="mt-1 text-[15px] leading-snug text-ink">
            {activeChain ? (
              <>
                <span className="font-semibold">{activeChain.name}</span> holds{" "}
                <span className="font-semibold tabular-nums">{formatBillions(activeChain.billions)}</span>,{" "}
                <span className="tabular-nums">{((activeChain.billions / data.totalBillions) * 100).toFixed(1)}%</span>{" "}
                of all stablecoins
              </>
            ) : (
              <>
                <span className="font-semibold tabular-nums">{formatBillions(data.totalBillions)}</span> in
                stablecoins.{" "}
                <span className="tabular-nums">{topTwoShare.toFixed(0)}%</span> on Ethereum and Tron.
              </>
            )}
          </p>
        </div>
        <span
          className={`mono-label mt-0.5 inline-flex shrink-0 items-center gap-1.5 ${
            data.status === "live" ? "text-ink" : "text-muted"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${data.status === "live" ? "bg-ink live-dot" : "bg-muted"}`}
          />
          {data.status === "live" ? "Live" : "Snapshot"}
        </span>
      </figcaption>

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {show3d ? <SupplyConstellation chains={data.chains} active={active} onActive={setActive} /> : null}
        <p className="mono-label pointer-events-none absolute left-4 top-3 text-muted sm:left-5">
          1 dot = $1B
        </p>
        <p className="mono-label pointer-events-none absolute bottom-3 right-4 hidden text-muted sm:right-5 sm:block">
          Drag to rotate
        </p>
      </div>

      <ul className="grid grid-cols-3 border-t border-line sm:grid-cols-3" aria-label="Stablecoin supply by chain">
        {data.chains.map((chain, index) => (
          <li key={chain.name} className="border-b border-r border-line [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0">
            <button
              type="button"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === index ? null : index)}
              aria-pressed={active === index}
              className={`flex w-full flex-col items-start px-3 py-2 text-left transition-colors duration-150 sm:px-4 ${
                active === index ? "bg-accent-soft" : "hover:bg-accent-mist"
              }`}
            >
              <span className="truncate text-[13px] text-ink-2">{chain.name}</span>
              <span className="font-mono text-[13px] tabular-nums text-ink">{formatBillions(chain.billions)}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="border-t border-line px-4 py-2.5 font-mono text-[11px] leading-relaxed text-muted sm:px-5">
        Source: DefiLlama stablecoin API · {data.status === "live" ? `updated ${data.asOf}` : `as of ${data.asOf}`}
      </p>
    </figure>
  );
}

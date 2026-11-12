"use client";

import { useEffect, useState } from "react";

export interface ChainSupply {
  name: string;
  /** Circulating USD-pegged stablecoin supply, in billions. */
  billions: number;
}

export interface ChainSupplyData {
  chains: ChainSupply[];
  totalBillions: number;
  /** "live" once DefiLlama answered, "snapshot" while loading or if it fails. */
  status: "live" | "snapshot";
  asOf: string;
}

const SHOWN = 8;

/**
 * Snapshot from DefiLlama's stablecoin API, 9 Nov 2026. Shown first and kept
 * if the live request fails, so the hero never renders empty.
 */
export const SNAPSHOT: ChainSupplyData = {
  status: "snapshot",
  asOf: "9 Nov 2026",
  totalBillions: 290.7,
  chains: [
    { name: "Ethereum", billions: 134.6 },
    { name: "Tron", billions: 93.6 },
    { name: "Solana", billions: 14.7 },
    { name: "BNB Chain", billions: 13.7 },
    { name: "Hyperliquid", billions: 6.6 },
    { name: "Base", billions: 5.1 },
    { name: "Arbitrum", billions: 3.7 },
    { name: "Polygon", billions: 2.9 },
    { name: "Others", billions: 15.8 },
  ],
};

const RENAME: Record<string, string> = { BSC: "BNB Chain", "Hyperliquid L1": "Hyperliquid" };

interface LlamaChain {
  name: string;
  totalCirculatingUSD?: { peggedUSD?: number };
}

function fromLlama(rows: LlamaChain[]): ChainSupplyData {
  const all = rows
    .map((row) => ({
      name: RENAME[row.name] ?? row.name,
      billions: (row.totalCirculatingUSD?.peggedUSD ?? 0) / 1e9,
    }))
    .filter((row) => row.billions > 0)
    .sort((a, b) => b.billions - a.billions);
  const total = all.reduce((sum, row) => sum + row.billions, 0);
  const top = all.slice(0, SHOWN);
  const rest = total - top.reduce((sum, row) => sum + row.billions, 0);
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return {
    status: "live",
    asOf: `today, ${time}`,
    totalBillions: total,
    chains: [...top, { name: "Others", billions: rest }],
  };
}

/** Live stablecoin supply by chain from DefiLlama, with a dated fallback. */
export function useStablecoinChains(): ChainSupplyData {
  const [data, setData] = useState<ChainSupplyData>(SNAPSHOT);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://stablecoins.llama.fi/stablecoinchains", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((rows: LlamaChain[]) => {
        const next = fromLlama(rows);
        if (next.totalBillions > 50) setData(next);
      })
      .catch(() => {
        /* keep the dated snapshot */
      });
    return () => controller.abort();
  }, []);

  return data;
}

export function formatBillions(value: number): string {
  return value >= 100 ? `$${value.toFixed(0)}B` : `$${value.toFixed(1)}B`;
}

import type { WorkItem, WorkKind } from "@/lib/types";

/**
 * All work, in display order. The first item is the featured case study.
 *
 * Every figure below is taken from Favour's own published articles and
 * dashboards (sources linked in `links`). Dates are publication dates.
 * Items marked `needsFindings` show build notes until the owner adds the
 * headline numbers from that dashboard.
 */
export const WORK: WorkItem[] = [
  {
    slug: "dollar-rails",
    title: "Dollar Rails",
    kind: "Dashboard",
    alsoKinds: ["Research"],
    topic: "Stablecoins · 14 coins · 14 chains",
    date: "Nov 2026",
    summary:
      "A live multi-chain stablecoin dashboard built on free data, asking where digital dollars sit, how they move, and who actually holds them.",
    keyFinding:
      "Ethereum and Tron hold 83% of tracked supply, but payment-sized transfers cluster on chains where a transfer costs a fraction of a cent.",
    stats: [
      { value: "83%", label: "of $272.1B tracked supply sits on Ethereum + Tron" },
      { value: "$2.18", label: "typical walk-in USDT transfer fee on Tron, vs $0.0011 on Solana" },
      { value: "96.9%", label: "of filtered Ethereum volume comes from 3.8% of transfers (>$100k)" },
    ],
    tools: ["DefiLlama", "CoinGecko", "Public RPC nodes", "Blockscout", "Tronscan"],
    links: [
      { label: "Open live dashboard", href: "https://dollar-rails.vercel.app/" },
      {
        label: "Read the write-up",
        href: "https://paragraph.com/@favedigitals/where-stable-coins-sit-isnt-where-they-move",
      },
    ],
    media: {
      type: "video",
      src: "/media/dollar-rails-walkthrough.mp4",
      poster: "/projects/dollar-rails.jpg",
      alt: "Walkthrough of the Dollar Rails stablecoin dashboard",
      width: 1920,
      height: 1080,
    },
    caseStudy: {
      question:
        "Most stablecoin dashboards answer one question: how much sits on each chain. I wanted to know where those dollars actually move, what moving them costs, and who controls the biggest balances.",
      method: [
        "Tracks 14 stablecoins across 14 chains using only free sources: DefiLlama, CoinGecko, public RPC nodes, Blockscout and Tronscan. No paid APIs.",
        "Fees come from what real senders paid for ordinary transfers in recent blocks.",
        "Transfer sizes come from a 24-hour sample, filtered to remove mints, burns, self-transfers, dust under $1, and senders appearing five or more times (mostly bots and exchange hot wallets).",
        "Issuance is measured as daily change in supply, not zero-address mints. USDT issues through its own Issue and Redeem events, and Circle's CCTP burns on one chain and mints on another, so mint counting gets both wrong.",
        "An address registry links the largest holders to public sources so concentration can be read as custodial or not.",
      ],
      findings: [
        {
          title: "Supply sits in two places",
          body: "The 14 tracked stablecoins hold $272.1B. Ethereum has $133.1B and Tron $93.6B, together 83%. USDT ($176.0B) is more than 2.5 times USDC ($68.5B).",
        },
        {
          title: "Tron is the expensive rail for walk-in senders",
          body: "A USDT transfer paid by burning TRX costs about $2.18, rising to $4.31 if the recipient has never held USDT. Solana and Base cost $0.0011 and $0.0014. Exchanges avoid this by staking or renting energy, which is why Tron stays popular.",
        },
        {
          title: "Cheaper chains carry the small payments",
          body: "The median filtered transfer is $27 on Solana and $42 on BNB Chain, against $216 on Ethereum and $324 on Tron. On Ethereum, transfers above $100k are 3.8% of transfers but 96.9% of volume, so it behaves more like a settlement layer.",
        },
        {
          title: "Much of the whale concentration is custodial",
          body: "The top 100 holders control 52.4% of USDT and USDC on Ethereum. The registry identifies 80% of that value, and exchanges hold 62% of what is identified. One Binance hot wallet holds about $14.2B. On Tron, the top 100 hold just 8.9%, and only 26.6% of it is identified so far.",
        },
      ],
      limits: [
        "Transfer data is sampled, not complete: 4,750 transfers on Ethereum, 975 on Tron (about 36 seconds of activity) and 374 on Solana. The direction is clear; exact percentages will move.",
        "Supply fell on most chains over the 30 days to 3 Nov, a window that includes the 29 Oct Binance hack. I have not separated the hack's effect from normal market activity, so I draw no causal conclusion.",
        "Tron attribution is weak. Improving it is the next priority.",
      ],
    },
  },
  {
    slug: "binance-hack-tron-trace",
    title: "Following the Binance hack money on Tron",
    kind: "Investigation",
    topic: "Fund tracing · Tron · THORChain",
    date: "Nov 2026",
    summary:
      "A transaction-by-transaction trace of the Tron side of the October 2026 Binance hack, built only from public blockchain data.",
    keyFinding:
      "Found 9 Ethereum and Bitcoin receiving addresses through THORChain deposit memos, none of which were on the FBI's published list.",
    stats: [
      { value: "222", label: "Tron wallets linked to the theft" },
      { value: "684.6M TRX", label: "about $205M, paid out by a single wallet" },
      { value: "9", label: "ETH/BTC receivers not on the FBI list" },
    ],
    tools: ["TronGrid", "Tronscan", "THORChain vault data"],
    links: [
      {
        label: "Read the full trace",
        href: "https://paragraph.com/@favedigitals/following-the-binance-hack-money-on-tron",
      },
    ],
    caseStudy: {
      question:
        "About $628M left Binance's Tron wallet on 29 October 2026. The FBI published more than 600 attacker addresses on Ethereum, Bitcoin and Solana, but none on Tron. Where did the Tron funds go?",
      method: [
        "Started at Binance's own Tron wallet and followed every hop with TronGrid and Tronscan, recording sender, receiver and transaction hash for each step.",
        "Read the memo on each THORChain deposit, which names the destination address on the other chain, and confirmed the vaults against THORChain's own vault list.",
        "Checked every publicly reported figure that could be verified on-chain: the amount stolen on Tron, both Tether freezes, and TRM Labs' estimate of USDT swapped through DEXs. All matched exactly.",
        "Compared destinations against the FBI alert of 31 October 2026.",
      ],
      findings: [
        {
          title: "USDT was converted before the second freeze",
          body: "612.7M USDT moved to the first attacker wallet. Tether froze the 312.7M left there. Of the 300M forwarded, 234M was swapped to TRX through a DEX router in 16 transactions over 27 minutes, before a second freeze caught the last 66.0M.",
        },
        {
          title: "One wallet ran the payouts",
          body: "The TRX was pooled, split across five staging wallets, then fed one at a time into a single payout wallet. It sent 684.6M TRX in 1,112 payments to 219 wallets over 51 hours, with at least one payment in each of 52 consecutive hours, while bots spammed it with address-poisoning dust.",
        },
        {
          title: "THORChain was the main exit",
          body: "Wallets funded by the payout wallet made 698 deposits into five THORChain vaults. The deposit memos named 9 Ethereum and Bitcoin receiving addresses, none of them on the FBI list. Other routes were a DEX router, Bitget Wallet's swap router, and a further layer of 932 wallets.",
        },
      ],
      limits: [
        "Destination amounts come from 32 of the funded wallets, so they are minimums.",
        "Some THORChain deposits were refunded after THORChain halted Tron trading on 31 October.",
        "These links show where money moved. They do not show who controls a wallet.",
        "An anonymous monitoring report on HackMD first named the opening Tron addresses (steps 1 to 3). This trace continues from there.",
      ],
    },
  },
  {
    slug: "stablecoin-revenue-defensibility",
    title: "Revenue defensibility for stablecoins",
    kind: "Research",
    topic: "Stablecoins · Market structure",
    date: "Aug 2026",
    summary:
      "An argument that a stablecoin's moat depends on who has to decide for supply to move, not on how many wallets hold it.",
    keyFinding:
      "On Hyperliquid, a validator vote gave USDH the mandate, yet its supply stalled near $100M while USDC grew to about $5B on the same platform.",
    stats: [
      { value: "4", label: "kinds of decision-maker behind stablecoin supply" },
      { value: "~$100M vs ~$5B", label: "USDH vs USDC on Hyperliquid after the vote" },
    ],
    tools: ["DefiLlama", "Governance records"],
    links: [
      {
        label: "Read the essay",
        href: "https://paragraph.com/@favedigitals/revenue-defensibility-for-stablecoin",
      },
    ],
    caseStudy: {
      question:
        "Stablecoin moats are usually judged by holder count. Is that the right unit of analysis?",
      method: [
        "Split stablecoin supply by who controls the decision to move it: individual holders, treasury allocators, platform governors, and protocol integrators.",
        "Tested the frame against four cases: USDT, Ethena's USDtb, Hyperliquid's USDH, and MakerDAO's USDC exposure, using DefiLlama history and governance records.",
      ],
      findings: [
        {
          title: "Decision points, not wallets",
          body: "A hundred million retail wallets routed through three custodians are closer to three decision points. The proposed measure is decision-point concentration: a Herfindahl-style index with decision-makers, not addresses, as the unit.",
        },
        {
          title: "A mandate is not liquidity",
          body: "Hyperliquid's validators chose a native issuer for USDH, but supply stalled near $100M while USDC grew to about $5B. Circle kept the position by matching the yield-sharing terms, so its margin compressed even though nobody switched.",
        },
        {
          title: "Switching is slower than it looks",
          body: "MakerDAO governance rejected diversifying away from USDC in March 2023. USDC in the Peg Stability Module still fell from over $2B to under $500M by that August, through gradual substitution rather than a clean swap.",
        },
      ],
      limits: [
        "Holder counts for USDT come from Tether's own reporting, not an independent audit.",
        "The closing prediction is meant to be falsifiable: a stablecoin distributed by governance mandate will lose share back to the incumbent within a year once the incumbent matches the economics.",
      ],
    },
  },
  {
    slug: "adi-chain-live-dashboard",
    title: "ADI Chain Live Dashboard",
    kind: "Dashboard",
    topic: "ADI Chain (chain ID 36900)",
    date: "2026",
    summary:
      "A live analytics dashboard for ADI Chain that reads price and market data alongside on-chain activity from the chain's own explorer and RPC.",
    keyFinding:
      "In its first 338 days after mainnet, ADI Chain processed 3.19M transactions across 713,857 addresses, about 9,400 transactions a day.",
    stats: [
      { value: "3.19M", label: "transactions since mainnet on 9 Dec 2025" },
      { value: "713,857", label: "addresses that have interacted with the chain" },
      { value: "~7.4s", label: "average block time" },
    ],
    tools: ["React", "Vite", "Chart.js", "Tailwind CSS", "Blockscout API", "CoinGecko", "ADI RPC"],
    links: [{ label: "Open live dashboard", href: "https://adi-dashboard-sandy.vercel.app/" }],
    media: {
      type: "video",
      src: "/media/ADI-live-dashboard.mp4",
      poster: "/projects/adi-chain-live-dashboard.png",
      alt: "ADI Chain live analytics dashboard",
      width: 1920,
      height: 1008,
    },
    needsFindings: true,
    caseStudy: {
      question:
        "What does activity on ADI Chain look like in real time, and can it be tracked reliably with public endpoints only?",
      method: [
        "Market data from CoinGecko (coin ID adi-token); blocks, transactions and addresses from ADI's Blockscout API and RPC.",
        "Built with React, Vite, Chart.js and Tailwind CSS, and deployed on Vercel.",
      ],
      findings: [
        {
          title: "Steady base load, early in its life",
          body: "As of 12 Nov 2026, ADI's explorer reports 3,188,679 transactions over 1.95M blocks since mainnet on 9 Dec 2025, an average of about 9,400 transactions a day across 338 days.",
        },
        {
          title: "Many addresses, few transactions each",
          body: "713,857 addresses have interacted with the chain, about 4.5 transactions per address on average. A ratio this low often points to many one-off wallets. Weekly active addresses would test that, and it is the next metric to add.",
        },
        {
          title: "Rebuilt after hardening the data layer",
          body: "The first version ran into CORS limits, uneven data granularity on the 24-hour view, and a circuit-breaker bug. The dashboard was rebuilt from scratch on React, Vite and Tailwind with those fixed.",
        },
      ],
      limits: [
        "Figures on this page are from ADI's Blockscout explorer API, read on 12 Nov 2026.",
        "Address counts include every address that ever interacted, not unique people.",
        "Depends on the availability of ADI's public explorer and RPC endpoints.",
      ],
    },
  },
  {
    slug: "adi-chain-overview",
    title: "ADI Chain Overview",
    kind: "Dashboard",
    topic: "ADI Chain · Dune Analytics",
    date: "2026",
    summary: "An on-chain overview of ADI Chain, written in DuneSQL and published on Dune Analytics.",
    tools: ["Dune Analytics", "DuneSQL"],
    links: [{ label: "View on Dune", href: "https://dune.com/favedigitals/adi-chain-overview" }],
    media: {
      type: "video",
      src: "/media/ADI-chain-overview.mp4",
      poster: "/projects/adi-chain-overview.png",
      alt: "ADI Chain Overview dashboard on Dune",
      width: 1920,
      height: 1008,
    },
    needsFindings: true,
    caseStudy: {
      question: "What does ADI Chain's on-chain activity look like at a glance?",
      method: ["Queries written in DuneSQL and published as a public Dune dashboard."],
      findingsLabel: "What it covers",
      findings: [
        {
          title: "Chain-level overview",
          body: "A public Dune dashboard summarising ADI Chain activity, kept alongside the live dashboard above.",
        },
      ],
      limits: ["Dune's free tier runs queries on demand, so figures reflect the last run."],
    },
  },
  {
    slug: "l0st-n-f0und",
    title: "L0st N F0und (LNF0) on-chain study",
    kind: "Dashboard",
    topic: "NFTs · Ethereum · 888-piece ERC-721",
    date: "2026",
    summary:
      "A 20-query Dune study of the LNF0 NFT collection: holders, supply, sales and the wallets that never sold.",
    tools: ["Dune Analytics", "DuneSQL"],
    links: [
      {
        label: "View on Dune",
        href: "https://dune.com/favedigitals/l0st-n-f0und-lnf0-complete-on-chain-analytics",
      },
    ],
    media: {
      type: "video",
      src: "/media/L0st-N-F0und-(LNF0).mp4",
      poster: "/projects/l0st-n-found.png",
      alt: "L0st N F0und on-chain analytics dashboard on Dune",
      width: 1920,
      height: 1008,
    },
    needsFindings: true,
    caseStudy: {
      question:
        "Who actually holds LNF0, an 888-piece ERC-721 collection on Ethereum, and how has trading behaved since mint?",
      method: [
        "20 DuneSQL queries against the collection contract (0x2630…CB14) on Ethereum.",
        "Covers unique holders, total supply, average sale price in ETH, daily sales volume, most active wallets, and minters who never transferred out.",
      ],
      findingsLabel: "What it covers",
      findings: [
        {
          title: "Holder behaviour, not just price",
          body: "Alongside sales and volume, the study isolates wallets that minted and never sold, a direct read on long-term holders.",
        },
      ],
      limits: ["Dune's free tier runs queries on demand, so figures reflect the last run."],
    },
  },
];

export const WORK_KINDS: WorkKind[] = ["Dashboard", "Investigation", "Research"];

export function getWork(slug: string): WorkItem | undefined {
  return WORK.find((item) => item.slug === slug);
}

export function workKinds(item: WorkItem): WorkKind[] {
  return [item.kind, ...(item.alsoKinds ?? [])];
}

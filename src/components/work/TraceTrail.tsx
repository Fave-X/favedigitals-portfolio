/**
 * The Tron fund trail from the Binance-hack investigation, as an ordered
 * sequence. Amounts are exactly as published in the article.
 */
const STEPS: { wallet: string; title: string; detail: string; side?: string }[] = [
  {
    wallet: "TDqSqu…",
    title: "Binance's Tron wallet is drained",
    detail: "612.7M USDT and 46.4M TRX move to the first attacker wallet in three transfers, 20:20 to 20:22 on 29 Oct.",
  },
  {
    wallet: "TG5iBM…",
    title: "300M USDT is forwarded",
    detail: "Sent in two transfers before Tether acts.",
    side: "312.7M USDT left behind is frozen by Tether",
  },
  {
    wallet: "TPBkSj…",
    title: "234M USDT swapped to TRX in 27 minutes",
    detail: "16 swaps through a DEX router, finished before the second freeze.",
    side: "Last 66.0M USDT sent to a wallet Tether froze",
  },
  {
    wallet: "TSpe5H…",
    title: "TRX pooled, then split five ways",
    detail: "638.2M TRX pooled, then split into five staging wallets within five minutes on 30 Oct.",
  },
  {
    wallet: "TRBdWq…",
    title: "One payout wallet distributes 684.6M TRX",
    detail: "1,112 payments to 219 wallets over 51 hours, at least one in each of 52 consecutive hours, while bots spam it with address-poisoning dust.",
  },
  {
    wallet: "Exits",
    title: "Funds leave Tron",
    detail: "698 deposits into five THORChain vaults, naming 9 ETH/BTC receivers not on the FBI list. Other routes: a DEX router, Bitget Wallet's swap router and a further 932-wallet layer.",
  },
];

export function TraceTrail({ compact = false }: { compact?: boolean }) {
  const steps = compact ? STEPS.filter((_, i) => i !== 3) : STEPS;
  return (
    <ol className="relative">
      {steps.map((step, index) => (
        <li key={step.wallet} className="relative grid grid-cols-[2rem_1fr] gap-x-3 pb-5 last:pb-0">
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="absolute left-[0.95rem] top-7 bottom-0 w-px bg-line-strong" />
          ) : null}
          <span
            aria-hidden="true"
            className={`relative z-10 mt-0.5 flex h-7 w-7 items-center justify-center border font-mono text-[11px] ${
              index === steps.length - 1 ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper text-ink-2"
            }`}
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-muted">{step.wallet}</p>
            <p className={`font-semibold text-ink ${compact ? "text-[14px]" : "text-[16px]"}`}>{step.title}</p>
            {compact ? null : <p className="mt-1 text-[15px] text-ink-2">{step.detail}</p>}
            {step.side && !compact ? (
              <p className="mt-2 inline-block border-l-2 border-line-strong pl-2 font-mono text-[12px] text-muted">
                {step.side}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

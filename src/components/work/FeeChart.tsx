/**
 * Dollar Rails: what a typical stablecoin transfer costs on each chain, next
 * to how big transfers typically are. Figures from the 3 Nov 2026 write-up.
 * Fee bars use a log scale because fees span more than three orders of
 * magnitude; every row also prints its value.
 */
const ROWS = [
  { chain: "Solana", token: "USDC/USDT", fee: 0.0011, median: 27, small: 94 },
  { chain: "Base", token: "USDC", fee: 0.0014, median: 60, small: 84 },
  { chain: "Polygon", token: "USDT0", fee: 0.002, median: 42, small: 91 },
  { chain: "Arbitrum", token: "USDC", fee: 0.003, median: 62, small: 84 },
  { chain: "BNB Chain", token: "USDT", fee: 0.003, median: 42, small: 95 },
  { chain: "Ethereum", token: "USDT", fee: 0.14, median: 216, small: 71 },
  { chain: "Tron", token: "USDT", fee: 2.18, median: 324, small: 65 },
];

const MIN = Math.log10(0.0005);
const MAX = Math.log10(5);
const TICKS = [0.001, 0.01, 0.1, 1];
const pos = (value: number) => ((Math.log10(value) - MIN) / (MAX - MIN)) * 100;

function formatFee(value: number) {
  return value >= 0.1 ? `$${value.toFixed(2)}` : `$${value.toFixed(4)}`;
}

export function FeeChart() {
  return (
    <figure className="border border-line bg-surface">
      <figcaption className="border-b border-line px-5 py-4">
        <p className="font-semibold text-ink">Cheaper chains carry smaller payments</p>
        <p className="mt-1 text-[14px] text-ink-2">
          Typical fee per transfer (log scale) beside the median filtered transfer and the share of transfers under
          $1,000.
        </p>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-line text-left">
              <th scope="col" className="mono-label py-2.5 pl-5 pr-3 font-normal text-muted">Chain</th>
              <th scope="col" className="mono-label w-[46%] py-2.5 pr-3 font-normal text-muted">Typical fee</th>
              <th scope="col" className="mono-label py-2.5 pr-3 text-right font-normal text-muted">Median transfer</th>
              <th scope="col" className="mono-label py-2.5 pr-5 text-right font-normal text-muted">Under $1k</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.chain} className="border-b border-line last:border-b-0">
                <th scope="row" className="py-2.5 pl-5 pr-3 text-left font-medium text-ink">
                  {row.chain}
                  <span className="ml-2 font-mono text-[11px] font-normal text-muted">{row.token}</span>
                </th>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-2.5 flex-1">
                      {TICKS.map((tick) => (
                        <span key={tick} aria-hidden="true" className="absolute inset-y-[-4px] w-px bg-line" style={{ left: `${pos(tick)}%` }} />
                      ))}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 rounded-r-[4px] ${row.fee > 0.1 ? "bg-ink" : "bg-ink-2/45"}`}
                        style={{ width: `${pos(row.fee)}%` }}
                      />
                    </div>
                    <span className="w-14 text-right font-mono tabular-nums text-ink">{formatFee(row.fee)}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-right font-mono tabular-nums text-ink">${row.median}</td>
                <td className="py-2.5 pr-5 text-right font-mono tabular-nums text-ink">{row.small}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td className="pr-3 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-4 flex-1">
                    {TICKS.map((tick) => (
                      <span key={tick} className="absolute -translate-x-1/2 font-mono text-[10px] text-muted" style={{ left: `${pos(tick)}%` }}>
                        ${tick}
                      </span>
                    ))}
                  </div>
                  <span className="w-14" />
                </div>
              </td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="border-t border-line px-5 py-2.5 font-mono text-[11px] text-muted">
        Tron fee is for a sender burning TRX; $4.31 if the recipient has never held USDT. Samples, not full counts.
      </p>
    </figure>
  );
}

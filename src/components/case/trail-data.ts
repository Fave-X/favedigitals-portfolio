/**
 * The Tron leg of the 29 Oct 2026 Binance hack, as published in
 * "Following the Binance hack money on Tron" (paragraph.com/@favedigitals).
 * Figures copied from the article; do not round differently.
 */
export type Hop = {
  wallet: string;
  role: string;
  move: string;
  /** Extra line shown on the case page only. */
  note?: string;
  /** The finding this hop ends in. */
  finding?: string;
};

export const TRAIL: Hop[] = [
  {
    wallet: "TDqSqu…SCf",
    role: "Binance's Tron wallet",
    move: "612.7M USDT and 46.4M TRX out in three transfers, 20:20–20:22 on 29 Oct",
  },
  {
    wallet: "TG5iBM…zsGi",
    role: "First attacker wallet",
    move: "300M USDT forwarded",
    note: "The 312.7M USDT left behind is frozen by Tether.",
  },
  {
    wallet: "TPBkSj…bKN4",
    role: "DEX router swaps",
    move: "234M USDT swapped to TRX in 16 trades over 27 minutes",
    note: "Its last 66.0M USDT went to a wallet Tether froze.",
  },
  {
    wallet: "TSpe5H…kyZ8A",
    role: "Five staging wallets",
    move: "638.2M TRX pooled, then split five ways in five minutes",
  },
  {
    wallet: "TRBdWq…A2PRki",
    role: "One payout wallet",
    move: "684.6M TRX paid out in 1,112 payments to 219 wallets over 51 hours",
    note: "At least one payment in each of 52 consecutive hours, while bots sprayed it with address-poisoning dust.",
  },
  {
    wallet: "5 THORChain vaults",
    role: "Exit to other chains",
    move: "698 deposits whose memos name the destination address",
    finding: "9 ETH and BTC addresses not on the FBI's list",
  },
];

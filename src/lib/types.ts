/**
 * Shared content types  -  machine mirror of knowledge.md §26 (Content Architecture).
 * Data files live in src/data/ and are populated only with information
 * provided in knowledge.md (§29  -  Content Integrity Rule: nothing is invented).
 */

/** Anchor targets of the single-page portfolio (knowledge.md §14/§15). */
export type SectionId = "work" | "stack" | "journey" | "research" | "about" | "contact";

/** Section surface treatments supported by SectionShell. */
export type SectionTone = "paper" | "tint" | "dark";

/** Primary navigation item (knowledge.md §15). */
export interface NavLink {
  id: SectionId;
  label: string;
  href: `#${SectionId}`;
}

/** Featured project (knowledge.md §5, §17). Optional fields render conditionally. */
export interface Project {
  id: string;
  /** Display order marker, e.g. "01". */
  index: string;
  title: string;
  url: string;
  /** e.g. "Dune Analytics"  -  shown only when known. */
  platform?: string;
  category: string;
  /** Factual one-liner only; no invented findings, metrics or outcomes (§17). */
  description?: string;
  /**
   * Project media (owner-provided). "image" renders via next/image;
   * "video" renders a native HTML5 video (autoplay, muted, loop, playsInline,
   * preload="metadata") using the supplied screenshot as poster/fallback.
   * width/height are intrinsic dimensions and reserve the aspect ratio.
   */
  media?: {
    type: "image" | "video";
    src: string;
    /** Video only: poster image shown before playback and as the no-play fallback. */
    poster?: string;
    alt: string;
    width: number;
    height: number;
  };
}

/** Published research/article (knowledge.md §7, §20). */
export interface ResearchItem {
  id: string;
  title: string;
  url: string;
  /** e.g. "Paragraph" */
  platform: string;
  category: string;
  note?: string;
}

/** Tool/technology grouping (knowledge.md §8, §18). No scores, no bars. */
export interface StackGroup {
  id: string;
  label: string;
  items: string[];
}

/** Web3 Journey stage (knowledge.md §4, §19). No dates, no counts. */
export interface JourneyStage {
  id: string;
  label: string;
  title: string;
  points: string[];
}

/** Core identity facts (knowledge.md §1, §2). */
export interface SiteIdentity {
  /** Legal/professional name, e.g. "Favour Tabugbo". */
  name: string;
  /** Professional Web3 identity, e.g. "FaveDigitals". */
  brand: string;
  /** e.g. "Web3 Data Analyst". */
  role: string;
  /** Primary positioning statement (§2). */
  statement: string;
  /** Supporting hero sentence (owner-approved hero copy). */
  supporting: string;
  /** Factual toolkit strip (§8). */
  toolkit: string[];
}

/** Contact/social channel (knowledge.md §22). Owner-confirmed channels only. */
export interface ContactChannel {
  id: string;
  /** Accessible label, e.g. "Twitter/X". */
  label: string;
  /** Absolute URL or mailto: address. */
  href: string;
  /** "email" links use mailto: and open in the same tab; "external" links open in a new tab. */
  kind: "email" | "external";
}
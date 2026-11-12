/**
 * Shared content types. Data lives in src/data/.
 *
 * Content rule: every number on this site comes from Favour's own published
 * dashboards and articles, and each one is shown with its source and date.
 * Nothing is invented or estimated.
 */

export type SectionId = "work" | "about" | "contact";

export type SectionTone = "paper" | "tint" | "dark";

export interface NavLink {
  id: SectionId;
  label: string;
  href: `/#${SectionId}`;
}

/** Kinds of work, used by the filter chips on the work index. */
export type WorkKind = "Dashboard" | "Investigation" | "Research";

export interface WorkLink {
  label: string;
  href: string;
}

/** A headline number shown on cards and case studies. */
export interface WorkStat {
  value: string;
  label: string;
}

export interface WorkFinding {
  title: string;
  body: string;
}

export interface WorkMedia {
  type: "video" | "image";
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
}

export interface WorkItem {
  slug: string;
  title: string;
  /** Primary kind (decides the filter chip). */
  kind: WorkKind;
  /** Extra kinds for items that are, say, a dashboard and an article. */
  alsoKinds?: WorkKind[];
  /** Short category line, e.g. "Stablecoins · Multi-chain". */
  topic: string;
  /** When it was published or last updated, as shown to readers. */
  date: string;
  /** One sentence: what this is. */
  summary: string;
  /** One sentence with the sharpest real finding. Omitted when none is published yet. */
  keyFinding?: string;
  stats?: WorkStat[];
  tools: string[];
  links: WorkLink[];
  media?: WorkMedia;
  /** Case-study page body. */
  caseStudy: {
    question: string;
    method: string[];
    findings: WorkFinding[];
    limits: string[];
    /** Optional label for findings section on build-focused pages. */
    findingsLabel?: string;
  };
  /** Set when the case study still needs the owner's own findings. */
  needsFindings?: boolean;
}

export interface TimelineEntry {
  when: string;
  what: string;
  detail: string;
}

export interface ToolProof {
  tool: string;
  /** Slugs of work items that show this tool in use. */
  proof: string[];
}

export interface ContactChannel {
  id: string;
  label: string;
  href: string;
  /** Visible handle or address. */
  handle: string;
  kind: "email" | "external";
}

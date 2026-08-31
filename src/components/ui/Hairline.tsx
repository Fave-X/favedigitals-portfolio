type HairlineTone = "default" | "strong" | "dark";

const toneClasses: Record<HairlineTone, string> = {
  default: "border-line",
  strong: "border-line-strong",
  dark: "border-white/10",
};

type HairlineProps = {
  tone?: HairlineTone;
  className?: string;
};

/** 1px horizontal rule  -  the structural divider used throughout the design. */
export function Hairline({ tone = "default", className }: HairlineProps) {
  return <hr aria-hidden="true" className={`border-t ${toneClasses[tone]} ${className ?? ""}`} />;
}
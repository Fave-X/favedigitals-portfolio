type SectionHeadingTone = "light" | "dark" | "tint";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: SectionHeadingTone;
  /** Used with aria-labelledby by SectionShell for accessible section naming. */
  titleId?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Standard section header: mono index + eyebrow, serif title, optional lede.
 * Keeps every section rhythmically identical (knowledge.md §14).
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  tone = "light",
  titleId,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  // "tint" sections use accent-soft backgrounds, where text-muted (≈4.4:1)
  // falls just below AA for 13px labels  -  text-ink-2 (≈7.2:1) is used instead.
  const labelTone =
    tone === "dark" ? "text-paper-on-dark/70" : tone === "tint" ? "text-ink-2" : "text-muted";
  const titleTone = tone === "dark" ? "text-paper-on-dark" : "text-ink";
  const ledeTone = tone === "dark" ? "text-paper-on-dark/80" : "text-ink-2";

  return (
    <div className={`max-w-[65ch] ${className ?? ""}`}>
      <p className={`mono-label ${labelTone}`}>
        {index ? <span className="text-accent">{index}</span> : null}
        {index ? ". " : null}
        {eyebrow}
      </p>
      <Tag
        id={titleId}
        className={`mt-3 font-serif font-semibold tracking-[-0.01em] text-h2 ${titleTone}`}
      >
        {title}
      </Tag>
      {lede ? <p className={`mt-4 text-lede ${ledeTone}`}>{lede}</p> : null}
    </div>
  );
}
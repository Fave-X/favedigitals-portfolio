import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionTone } from "@/lib/types";

const toneClasses: Record<SectionTone, string> = {
  paper: "border-t border-line bg-paper text-ink",
  tint: "border-t border-line bg-accent-soft text-ink",
  dark: "border-t border-white/10 bg-ink text-paper-on-dark",
};

const headingTones: Record<SectionTone, "light" | "dark" | "tint"> = {
  paper: "light",
  tint: "tint",
  dark: "dark",
};

type SectionShellProps = {
  id: string;
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: SectionTone;
  children?: ReactNode;
  className?: string;
};

/**
 * Standard section structure: consistent rhythm, header treatment and tones
 * across the site (knowledge.md §14). Portfolio sections provide their own
 * content as children — nothing is populated here yet.
 */
export function SectionShell({
  id,
  index,
  eyebrow,
  title,
  lede,
  tone = "paper",
  children,
  className,
}: SectionShellProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`scroll-mt-20 ${toneClasses[tone]} ${className ?? ""}`}
    >
      <Container className="py-16 md:py-24 lg:py-32">
        <SectionHeading
          index={index}
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          tone={headingTones[tone]}
          titleId={titleId}
        />
        {children ? <div className="mt-10 md:mt-12">{children}</div> : null}
      </Container>
    </section>
  );
}
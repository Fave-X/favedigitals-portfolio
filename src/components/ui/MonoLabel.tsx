import type { ReactNode } from "react";

type MonoLabelAs = "span" | "p" | "div";

type MonoLabelTone = "default" | "secondary" | "dark" | "accent";

const toneClasses: Record<MonoLabelTone, string> = {
  default: "text-muted",
  secondary: "text-ink-2",
  dark: "text-footer-text/70",
  accent: "text-accent",
};

type MonoLabelProps = {
  children: ReactNode;
  as?: MonoLabelAs;
  tone?: MonoLabelTone;
  className?: string;
};

/** Small mono data label (13px, uppercase, tracked)  -  eyebrows, meta rows, tags. */
export function MonoLabel({ children, as: Tag = "span", tone = "default", className }: MonoLabelProps) {
  return <Tag className={`mono-label ${toneClasses[tone]} ${className ?? ""}`}>{children}</Tag>;
}
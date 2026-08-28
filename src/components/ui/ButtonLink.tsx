import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "ghost";

const variantClasses: Record<ButtonLinkVariant, string> = {
  // Solid ink → subtle lift on hover via opacity (no new colors, no shadows).
  primary: "bg-ink text-paper-on-dark hover:opacity-90",
  // Paper surface, hairline border; hover darkens the hairline and the label.
  ghost: "border border-line bg-paper text-ink-2 hover:border-line-strong hover:text-ink",
};

type ButtonLinkProps = {
  href: string;
  variant?: ButtonLinkVariant;
  className?: string;
  children: ReactNode;
};

/** Anchor styled as a button. Minimum 44px interaction height; flat, accessible. */
export function ButtonLink({ href, variant = "primary", className, children }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`no-underline inline-flex min-h-11 items-center justify-center px-6 text-[15px] font-medium transition-[color,background-color,border-color,opacity] duration-200 ${
        variantClasses[variant]
      } ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
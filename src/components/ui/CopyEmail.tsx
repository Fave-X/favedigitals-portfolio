"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SITE } from "@/data/site";

type Props = {
  className?: string;
  /** "button": solid red-pen button. "inline": a text link. */
  variant?: "button" | "inline";
  label?: string;
};

/** Copies the email address; recruiters usually paste it into their own mail client. */
export function CopyEmail({ className, variant = "button", label }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const base =
    variant === "button"
      ? "inline-flex min-h-11 items-center justify-center gap-2 bg-accent px-5 text-[15px] font-semibold text-on-accent transition-colors duration-150 hover:bg-accent-deep"
      : "inline-flex items-center gap-2 font-semibold text-accent underline decoration-[color-mix(in_srgb,currentColor_45%,transparent)] underline-offset-4 hover:decoration-current";

  return (
    <button type="button" onClick={copy} className={`${base} ${className ?? ""}`} aria-live="polite">
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? "Email copied" : (label ?? "Copy email")}
    </button>
  );
}

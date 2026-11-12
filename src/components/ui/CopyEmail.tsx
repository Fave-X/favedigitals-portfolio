"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SITE } from "@/data/site";

type Props = {
  className?: string;
  /** "button" = bordered button; "inline" = text link style. */
  variant?: "button" | "inline";
  label?: string;
};

/**
 * Copies the email address. Recruiters usually paste it into their own mail
 * client, so this is more reliable than a mailto link.
 */
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
      ? "inline-flex min-h-11 items-center justify-center gap-2 border border-line bg-paper px-5 text-[15px] font-medium text-accent transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent"
      : "inline-flex items-center gap-2 text-accent hover:underline underline-offset-4";

  return (
    <button type="button" onClick={copy} className={`${base} ${className ?? ""}`} aria-live="polite">
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? "Email copied" : (label ?? "Copy email")}
    </button>
  );
}

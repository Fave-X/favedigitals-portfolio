import { ArrowUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Hairline } from "@/components/ui/Hairline";
import { NAV_LINKS } from "@/data/navigation";
import { SITE_IDENTITY } from "@/data/site";

const footerLinkClasses =
  "no-underline inline-flex items-center px-2 -mx-2 py-2.5 -my-2.5 text-[15px] text-paper-on-dark/70 transition-colors duration-200 hover:text-paper-on-dark focus-visible:outline-paper-on-dark";

/**
 * Site footer (knowledge.md §23) — the single dark band: brand block, section
 * links, back-to-top, and a minimal two-part bottom row. No fabricated
 * achievements or company information.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper-on-dark">
      <Container>
        <div className="flex flex-col items-center gap-10 py-12 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:py-16 md:text-left">
          {/* Left: brand */}
          <div>
            <p className="font-serif text-xl font-semibold text-paper-on-dark">
              {SITE_IDENTITY.brand}
            </p>
            <MonoLabel tone="dark" className="mt-2">
              {SITE_IDENTITY.role}
            </MonoLabel>
          </div>

          {/* Middle: section links (same anchors as the primary nav) */}
          <nav aria-label="Footer">
            <ul className="flex flex-col items-center gap-3 md:items-start">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={footerLinkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: back to top */}
          <a
            href="#top"
            className="no-underline inline-flex items-center gap-1.5 px-2 -mx-2 py-2.5 -my-2.5 text-[15px] text-paper-on-dark/70 transition-colors duration-200 hover:text-paper-on-dark focus-visible:outline-paper-on-dark"
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>

        <Hairline tone="dark" />

        <div className="flex flex-col items-center gap-2 py-6 md:flex-row md:justify-between">
          <MonoLabel tone="dark" as="p">
            © 2026 FaveDigitals
          </MonoLabel>
          <MonoLabel tone="dark" as="p">
            On-chain data · Published insights
          </MonoLabel>
        </div>
      </Container>
    </footer>
  );
}
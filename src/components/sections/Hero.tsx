import { Container } from "@/components/layout/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroIndex } from "@/components/sections/HeroIndex";
import { SITE_IDENTITY } from "@/data/site";

/** Approved supporting copy, derived from knowledge.md §2/§3 (no claims, no metrics). */
const HERO_SUMMARY =
  "On-chain analytics, protocol analysis and data dashboards — with published Web3 research.";

/**
 * Hero (knowledge.md §16): positioning first. Editorial, restrained, no
 * decorative graphics, no animation, fully functional without JavaScript.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <Container>
        <div className="grid grid-cols-1 gap-y-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-x-6 lg:py-32">
          {/* Positioning content — 7 of 12 columns on desktop */}
          <div className="lg:col-span-7">
            <MonoLabel>{`${SITE_IDENTITY.brand} — ${SITE_IDENTITY.role}`}</MonoLabel>

            <h1
              id="hero-title"
              className="mt-6 font-serif font-semibold tracking-[-0.01em] text-h1 text-ink"
            >
              {SITE_IDENTITY.statement.slice(0, -1)}
              <span className="text-accent">.</span>
            </h1>

            <p className="mt-6 max-w-[52ch] text-ink-2">{HERO_SUMMARY}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#work" variant="primary" className="w-full sm:w-auto">
                View Selected Work
              </ButtonLink>
              <ButtonLink href="#research" variant="ghost" className="w-full sm:w-auto">
                Read Research
              </ButtonLink>
            </div>

            <p className="mono-label mt-10 text-muted">{SITE_IDENTITY.toolkit.join(" · ")}</p>
          </div>

          {/* Compact strip — 768–1023px only */}
          <div className="hidden md:col-span-12 md:block lg:hidden">
            <HeroIndex variant="strip" />
          </div>

          {/* Sidebar panel — ≥1024px, 4 of 12 columns after a gutter column */}
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <HeroIndex variant="panel" />
          </div>
        </div>
      </Container>
    </section>
  );
}
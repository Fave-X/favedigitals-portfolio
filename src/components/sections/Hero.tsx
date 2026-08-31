import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProfileTilt } from "@/components/ui/ProfileTilt";
import { SITE_IDENTITY } from "@/data/site";

/**
 * Hero: identity first. FaveDigitals is the dominant element, followed by the
 * role, the main statement and the supporting statement (owner-approved copy).
 * The profile portrait sits beside the copy on desktop and stacks below it on
 * smaller screens. Tilt is isolated in the ProfileTilt client leaf; Hero
 * itself stays a server component.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <Container>
        <div className="grid grid-cols-1 items-center gap-y-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-x-6 lg:py-32">
          {/* Identity and copy: 7 of 12 columns on desktop */}
          <div className="lg:col-span-7">
            <h1
              id="hero-title"
              className="font-serif font-semibold leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,8vw,5.75rem)] text-ink"
            >
              {SITE_IDENTITY.brand}
            </h1>

            <p className="mt-5 font-mono text-sm tracking-[0.08em] text-accent">
              {SITE_IDENTITY.role}
            </p>

            <p className="mt-10 max-w-[26ch] font-serif font-semibold tracking-[-0.01em] text-h2 text-ink">
              {SITE_IDENTITY.statement.slice(0, -1)}
              <span className="text-accent">.</span>
            </p>

            <p className="mt-6 max-w-[52ch] text-ink-2">{SITE_IDENTITY.supporting}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#work" variant="primary" className="w-full sm:w-auto">
                View Selected Work
              </ButtonLink>
              <ButtonLink href="#research" variant="ghost" className="w-full sm:w-auto">
                Read Research
              </ButtonLink>
            </div>

            {/* Toolkit: factual tool list, integrated as a labeled hairline row
                (hairline-top separates it from the CTAs; hairline separators
                between tools keep it part of the editorial structure). */}
            <p className="mono-label mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-5 text-muted">
              {SITE_IDENTITY.toolkit.map((tool, index) => (
                <span key={tool} className="flex items-center gap-x-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-line-strong">
                      /
                    </span>
                  ) : null}
                  {tool}
                </span>
              ))}
            </p>
          </div>

          {/* Profile portrait  -  4 of 12 columns on desktop, stacked below on smaller screens */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="mx-auto max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-none">
              <ProfileTilt>
                <Image
                  src="/images/fave-digitals-profile.png"
                  alt="FaveDigitals portrait"
                  width={1254}
                  height={1254}
                  priority
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 384px, 320px"
                  className="h-auto w-full"
                />
              </ProfileTilt>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
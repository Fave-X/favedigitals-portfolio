import Image from "next/image";
import { Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { HeroSupply } from "@/components/sections/HeroSupply";
import { SITE } from "@/data/site";

/**
 * Hero: who, what, and proof in one screen. Name and availability first, a
 * one-line thesis, two actions, and a live data panel that shows the kind of
 * thing Favour builds.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 gap-y-12 pt-12 pb-16 md:pt-16 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/fave-digitals-profile.png"
                alt="Portrait of Favour Tabugbo"
                width={112}
                height={112}
                priority
                className="h-14 w-14 border border-line object-cover grayscale"
              />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-ink">{SITE.name}</p>
                <p className="mono-label mt-0.5 text-muted">
                  {SITE.brand} · {SITE.role}
                </p>
              </div>
            </div>

            <h1
              id="hero-title"
              className="font-display mt-10 max-w-[13ch] font-normal leading-[0.98] tracking-[-0.015em] text-[clamp(3rem,7.4vw,5.6rem)] text-ink"
            >
              <span className="sr-only">{SITE.name}: </span>
              I trace where money moves <em className="italic">on-chain</em>
            </h1>

            <p className="mt-6 max-w-[48ch] text-lede text-ink-2">{SITE.supporting}</p>

            <p className="mt-8 inline-flex items-center gap-2.5 border border-line-strong px-3 py-1.5 text-[14px] text-ink">
              <span aria-hidden="true" className="live-dot h-2 w-2 rounded-full bg-ink-2" />
              {SITE.availability}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#work" variant="primary" className="w-full sm:w-auto">
                See the work
              </ButtonLink>
              <a
                href={SITE.cv}
                download
                className="no-underline inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line bg-paper px-5 text-[15px] font-medium text-accent transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent sm:w-auto"
              >
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
              <CopyEmail className="w-full sm:w-auto" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroSupply />
          </div>
        </div>
      </Container>
    </section>
  );
}

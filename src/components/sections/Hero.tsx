import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Trail } from "@/components/case/Trail";
import { SITE } from "@/data/site";

const FILE_FIELDS: { label: string; value: string }[] = [
  { label: "Investigator", value: "FaveDigitals" },
  { label: "Subject", value: "On-chain fund flows" },
  { label: "Based", value: "Lagos, UTC+1" },
  { label: "Status", value: "Open to remote roles" },
];

/**
 * The cover of the case file: typed file fields, the thesis, and the
 * evidence itself (the Binance trail) in the first viewport.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="scroll-mt-20">
      <Container>
        <dl className="grid grid-cols-2 border-b border-line py-4 sm:grid-cols-4">
          {FILE_FIELDS.map((field) => (
            <div key={field.label} className="py-1.5 pr-4">
              <dt className="field">{field.label}</dt>
              <dd className="typed mt-1 text-[14px] text-ink">{field.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 gap-8 pt-10 pb-12 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 id="hero-title" className="case-title text-h1 text-ink lg:col-span-8">
            <span className="sr-only">{SITE.brand}: </span>I trace where money moves on-chain
          </h1>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-[46ch] text-lede text-ink-2">{SITE.supporting}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={SITE.cv} download className="inline-flex items-center gap-2 font-semibold">
                <Download size={17} aria-hidden="true" />
                Download CV
              </a>
              <CopyEmail variant="inline" />
            </div>
          </div>
        </div>

        <figure className="border border-line bg-surface">
          <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-5 py-3.5 md:px-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="exhibit-tag">Case on file</span>
              <span className="case-title text-[1.35rem] text-ink [font-stretch:80%]">
                Binance hack, Tron leg
              </span>
              <span className="typed text-[13px] text-muted">29 Oct – 1 Nov 2026</span>
            </div>
            <Link
              href="/work/binance-hack-tron-trace"
              className="group inline-flex items-center gap-2 font-semibold no-underline hover:underline"
            >
              Open the case
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </figcaption>
          <div className="px-5 pt-7 pb-8 md:px-7 md:pt-8">
            <Trail trace="load" />
          </div>
        </figure>
      </Container>
    </section>
  );
}

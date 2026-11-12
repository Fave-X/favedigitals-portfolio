import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { KindChips } from "@/components/work/KindChips";
import { WorkMedia } from "@/components/work/WorkMedia";
import { TraceTrail } from "@/components/work/TraceTrail";
import { FeeChart } from "@/components/work/FeeChart";
import { WORK, getWork } from "@/data/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.keyFinding ?? item.summary,
    openGraph: { title: item.title, description: item.keyFinding ?? item.summary, type: "article" },
    twitter: { card: "summary_large_image", title: item.title, description: item.keyFinding ?? item.summary },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-12">
      <h2 className="mono-label text-muted md:col-span-3">{label}</h2>
      <div className="min-w-0 md:col-span-9">{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const index = WORK.findIndex((entry) => entry.slug === slug);
  const next = WORK[(index + 1) % WORK.length];
  const { caseStudy } = item;

  return (
    <main id="content">
      <Container className="pt-8 pb-16 md:pt-12 md:pb-24">
        <Link href="/#work" className="no-underline inline-flex items-center gap-2 text-[14px] text-accent hover:underline">
          <ArrowLeft size={15} aria-hidden="true" />
          All work
        </Link>

        <header className="mt-8 grid grid-cols-1 gap-8 md:mt-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <KindChips item={item} />
            <h1 className="mt-5 font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              {item.title}
            </h1>
            <p className="mt-5 max-w-[56ch] text-lede text-ink-2">{item.summary}</p>
          </div>
          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-4 border-t border-line pt-5 text-[14px] lg:col-span-4 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div>
              <dt className="mono-label text-muted">Published</dt>
              <dd className="mt-1 text-ink">{item.date}</dd>
            </div>
            <div>
              <dt className="mono-label text-muted">Area</dt>
              <dd className="mt-1 text-ink">{item.topic}</dd>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <dt className="mono-label text-muted">Data and tools</dt>
              <dd className="mt-1 text-ink">{item.tools.join(", ")}</dd>
            </div>
            <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent"
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" className="arrow-shift" />
                </a>
              ))}
            </div>
          </dl>
        </header>

        {item.stats ? (
          <dl className="mt-12 grid grid-cols-1 border border-line sm:grid-cols-3">
            {item.stats.map((stat) => (
              <div key={stat.label} className="border-b border-line p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-[2rem] leading-none font-semibold tabular-nums text-ink">{stat.value}</dd>
                <dd className="mt-2 text-[14px] text-ink-2">{stat.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {item.media ? (
          <div className="mt-12 border border-line">
            <WorkMedia media={item.media} controls />
          </div>
        ) : null}

        <div className="mt-12">
          <Block label="The question">
            <p className="max-w-[62ch] font-serif text-[1.4rem] leading-snug text-ink">{caseStudy.question}</p>
          </Block>

          <Block label="Data and method">
            <ol className="max-w-[66ch] space-y-3 text-ink-2">
              {caseStudy.method.map((step, i) => (
                <li key={step} className="grid grid-cols-[1.75rem_1fr]">
                  <span className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          {item.slug === "binance-hack-tron-trace" ? (
            <Block label="The trail">
              <div className="max-w-[62ch]">
                <TraceTrail />
              </div>
            </Block>
          ) : null}

          <Block label={caseStudy.findingsLabel ?? "Findings"}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {caseStudy.findings.map((finding, i) => (
                <article key={finding.title} className="border-t-2 border-ink pt-4">
                  <p className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-semibold text-ink">{finding.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-2">{finding.body}</p>
                </article>
              ))}
            </div>
            {item.slug === "dollar-rails" ? (
              <div className="mt-10">
                <FeeChart />
              </div>
            ) : null}
          </Block>

          <Block label="Limits">
            <ul className="max-w-[66ch] list-disc space-y-2 pl-5 text-ink-2 marker:text-line-strong">
              {caseStudy.limits.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </Block>
        </div>

        <nav aria-label="Next case study" className="mt-4 border-t border-line pt-8">
          <Link href={`/work/${next.slug}`} className="no-underline group flex items-center justify-between gap-6">
            <span>
              <span className="mono-label block text-muted">Next</span>
              <span className="mt-1 block font-serif text-h3 font-semibold text-ink group-hover:underline decoration-accent decoration-2 underline-offset-4">
                {next.title}
              </span>
            </span>
            <ArrowRight size={22} aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </Container>
    </main>
  );
}

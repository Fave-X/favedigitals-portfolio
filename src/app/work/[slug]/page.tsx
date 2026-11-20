import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { WorkMedia } from "@/components/work/WorkMedia";
import { FeeChart } from "@/components/work/FeeChart";
import { Trail } from "@/components/case/Trail";
import { WORK, exhibitLetter, getWork, workKinds } from "@/data/work";

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

function Sheet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-4 border-t border-line-strong py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <h2 className="case-title text-[1.75rem] leading-none text-ink [font-stretch:78%] md:col-span-3">{title}</h2>
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

  const fields = [
    { label: "Exhibit", value: exhibitLetter(index) },
    { label: "Filed", value: item.date },
    { label: "Type", value: workKinds(item).join(", ") },
    { label: "Area", value: item.topic },
  ];

  return (
    <main id="content">
      <Container className="pt-8 pb-20 md:pt-10 md:pb-28">
        <Link href="/#work" className="inline-flex items-center gap-2 text-[15px] font-semibold no-underline hover:underline">
          <ArrowLeft size={16} aria-hidden="true" />
          All exhibits
        </Link>

        <article className="mt-6 border border-line-strong bg-surface">
          <header className="px-5 pt-6 pb-8 md:px-10 md:pt-8 md:pb-10">
            <dl className="grid grid-cols-2 gap-y-3 border-b border-line pb-5 sm:grid-cols-4">
              {fields.map((field) => (
                <div key={field.label} className="pr-4">
                  <dt className="field">{field.label}</dt>
                  <dd className="typed mt-1 text-[14px] text-ink">{field.value}</dd>
                </div>
              ))}
            </dl>
            <h1 className="case-title mt-8 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] text-ink">{item.title}</h1>
            <p className="mt-5 max-w-[60ch] text-lede text-ink-2">{item.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              {item.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold">
                  {link.label}
                  <ArrowUpRight size={15} aria-hidden="true" className="arrow-shift" />
                </a>
              ))}
            </div>
          </header>

          {item.stats ? (
            <div className="border-t border-line-strong px-5 py-6 md:px-10">
              <p className="field">Key evidence</p>
              <table className="mt-3 w-full border-collapse text-left">
                <tbody>
                  {item.stats.map((stat) => (
                    <tr key={stat.label} className="border-b border-line last:border-b-0 align-baseline">
                      <td className="typed w-[9.5rem] py-2.5 pr-4 text-[1.35rem] text-ink md:w-[12rem] md:text-[1.6rem]">{stat.value}</td>
                      <td className="py-2.5 text-[15px] text-ink-2">{stat.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {item.media ? (
            <div className="border-t border-line-strong">
              <WorkMedia media={item.media} controls />
            </div>
          ) : null}

          <div className="px-5 md:px-10">
            <Sheet title="The question">
              <p className="max-w-[62ch] text-[1.25rem] leading-snug text-ink">{caseStudy.question}</p>
            </Sheet>

            <Sheet title="Data and method">
              <ol className="max-w-[66ch] space-y-3 text-ink-2">
                {caseStudy.method.map((step, i) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr]">
                    <span className="typed text-[14px] text-muted">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Sheet>

            {item.slug === "binance-hack-tron-trace" ? (
              <Sheet title="The trail">
                <div className="max-w-[60ch]">
                  <Trail trace="scroll" layout="vertical" />
                </div>
              </Sheet>
            ) : null}

            <Sheet title={caseStudy.findingsLabel ?? "Findings"}>
              <ol className="grid max-w-[44rem] grid-cols-1 gap-y-8">
                {caseStudy.findings.map((finding, i) => (
                  <li key={finding.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
                    <span
                      aria-hidden="true"
                      className="typed flex h-9 w-9 items-center justify-center rounded-[50%/46%] border-2 border-accent text-[15px] font-bold text-accent [transform:rotate(-4deg)]"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold leading-snug text-ink">{finding.title}</h3>
                      <p className="mt-2 text-[15.5px] text-ink-2">{finding.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {item.slug === "dollar-rails" ? (
                <div className="mt-12">
                  <FeeChart />
                </div>
              ) : null}
            </Sheet>

            <Sheet title="What the data cannot show">
              <ul className="max-w-[66ch] list-disc space-y-2 pl-5 text-ink-2 marker:text-muted">
                {caseStudy.limits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            </Sheet>
          </div>
        </article>

        <nav aria-label="Next exhibit" className="mt-8">
          <Link href={`/work/${next.slug}`} className="group flex items-center justify-between gap-6 border border-line-strong px-5 py-5 no-underline hover:bg-accent-mist md:px-10">
            <span className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="exhibit-tag self-start sm:self-auto">Next: Exhibit {exhibitLetter((index + 1) % WORK.length)}</span>
              <span className="case-title text-[clamp(1.4rem,3vw,2rem)] leading-tight text-accent [font-stretch:80%]">{next.title}</span>
            </span>
            <ArrowRight size={24} aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </Container>
    </main>
  );
}

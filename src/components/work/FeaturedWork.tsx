import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/lib/types";
import { KindChips } from "@/components/work/KindChips";
import { WorkMedia } from "@/components/work/WorkMedia";

/** The lead case study: recording, the three numbers that matter, and links. */
export function FeaturedWork({ item }: { item: WorkItem }) {
  return (
    <article className="border border-line bg-surface">
      {/* Full recording at its own aspect ratio, so no part of the screen is cut off. */}
      {item.media ? (
        <div className="border-b border-line">
          <WorkMedia media={item.media} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-x-10 p-6 md:p-8 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono-label text-ink-2">Featured</span>
            <KindChips item={item} />
          </div>
          <h3 className="mt-4 font-serif text-h3 font-semibold tracking-[-0.01em] text-ink">
            {item.title}
          </h3>
          <p className="mono-label mt-2 text-muted">
            {item.topic} · {item.date}
          </p>
          <p className="mt-4 max-w-[52ch] text-ink-2">{item.summary}</p>
        </div>

        <div className="mt-8 flex flex-col lg:col-span-6 lg:mt-0">
          {item.stats ? (
            <dl className="divide-y divide-line border-y border-line">
              {item.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-3"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-serif text-[1.6rem] leading-none font-semibold tabular-nums text-ink">
                    {stat.value}
                  </dd>
                  <dd className="text-[14px] leading-snug text-ink-2">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap">
            <Link
              href={`/work/${item.slug}`}
              className="no-underline group inline-flex min-h-11 items-center justify-center gap-2 bg-accent px-5 text-[15px] font-medium text-paper transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              Read the case study
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            {item.links.slice(0, 1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex min-h-11 items-center justify-center gap-1.5 border border-line px-5 text-[15px] text-accent transition-colors hover:border-accent"
              >
                {link.label}
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="arrow-shift"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

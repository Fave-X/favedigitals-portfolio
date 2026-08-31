import { SectionShell } from "@/components/layout/SectionShell";
import { ABOUT_FACTS, ABOUT_COPY } from "@/data/about";

/**
 * About (knowledge.md §21): compact factual identity panel + the approved
 * two-paragraph Web3 copy. Strictly Web3/on-chain, no non-Web3 background.
 */
export function About() {
  return (
    <SectionShell id="about" eyebrow="ABOUT" title="About">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {/* Fact panel  -  3 cols, sticky on desktop */}
        <div className="lg:col-span-3">
          <div className="border border-line bg-paper lg:sticky lg:top-24">
            <dl className="divide-y divide-line">
              {ABOUT_FACTS.map((fact) => (
                <div key={fact.label} className="px-5 py-4">
                  <dt className="mono-label text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Copy  -  7 cols */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-4">
            {ABOUT_COPY.map((paragraph) => (
              <p key={paragraph} className="max-w-[65ch] text-ink-2">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
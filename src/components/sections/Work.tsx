import { Container } from "@/components/layout/Container";
import { ExhibitLog } from "@/components/case/ExhibitLog";
import { WORK } from "@/data/work";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 pt-24 md:pt-32">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="case-title text-h2 text-ink lg:col-span-7">
            Exhibits
          </h2>
          <p className="max-w-[52ch] text-ink-2 lg:col-span-5">
            Every case has the question, the data and method, what I found, and what the data cannot show. Each
            figure links back to the published article or live dashboard.
          </p>
        </div>
        <div className="mt-10">
          <ExhibitLog items={WORK} />
        </div>
      </Container>
    </section>
  );
}

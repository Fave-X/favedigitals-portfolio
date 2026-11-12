import { SectionShell } from "@/components/layout/SectionShell";
import { FeaturedWork } from "@/components/work/FeaturedWork";
import { WorkIndex } from "@/components/work/WorkIndex";
import { WORK } from "@/data/work";

export function Work() {
  const [featured, ...rest] = WORK;
  return (
    <SectionShell
      id="work"
      eyebrow="Work"
      title="Dashboards, investigations and research"
      lede="Each project has a case study: the question, the data and method, what I found, and where the data runs out."
    >
      <FeaturedWork item={featured} />
      <div className="mt-16 md:mt-20">
        <WorkIndex items={rest} />
      </div>
    </SectionShell>
  );
}

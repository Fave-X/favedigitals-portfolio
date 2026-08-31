import { SectionShell } from "@/components/layout/SectionShell";
import { Hairline } from "@/components/ui/Hairline";
import { STACK_GROUPS } from "@/data/stack";

/**
 * Analytical Stack (knowledge.md §18): three equal groups (mono label,
 * hairline, plain text rows with subtle separators. No cards, pills, icons,
 * bars or scores. Static server component: fully readable without JavaScript.
 */
export function AnalyticalStack() {
  return (
    <SectionShell
      id="stack"
      index="02"
      eyebrow="ANALYTICAL STACK"
      title="Analytical Stack"
      lede="Tools I use to collect, analyse and present on-chain data."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
        {STACK_GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="mono-label text-ink">{group.label}</h3>
            <Hairline className="mt-3" />
            <ul className="mt-2 divide-y divide-line">
              {group.items.map((item) => (
                <li key={item} className="py-3 text-[15px] text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
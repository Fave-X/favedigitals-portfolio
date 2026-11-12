import type { WorkItem } from "@/lib/types";
import { workKinds } from "@/data/work";

export function KindChips({ item, className }: { item: WorkItem; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className ?? ""}`} aria-label="Type of work">
      {workKinds(item).map((kind) => (
        <li key={kind} className="mono-label border border-line px-2 py-0.5 text-[11px] text-ink-2">
          {kind}
        </li>
      ))}
    </ul>
  );
}

import type { WorkItem } from "@/lib/types";
import { TraceTrail } from "@/components/work/TraceTrail";

/** Visual for a work item: its recording, the trace trail, or its key line. */
export function WorkPreview({ item }: { item: WorkItem }) {
  if (item.media) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.media.poster}
        alt={item.media.alt}
        width={item.media.width}
        height={item.media.height}
        loading="lazy"
        className="block h-auto w-full"
      />
    );
  }
  if (item.slug === "binance-hack-tron-trace") {
    return (
      <div className="bg-surface p-5">
        <TraceTrail compact />
      </div>
    );
  }
  return (
    <div className="flex aspect-[16/10] flex-col justify-between bg-surface-raised p-6">
      <p className="mono-label text-muted">{item.topic}</p>
      <p className="font-serif text-[1.35rem] leading-snug text-ink">{item.keyFinding ?? item.summary}</p>
    </div>
  );
}

import { PROJECTS } from "@/data/projects";

type HeroIndexVariant = "panel" | "strip";

type HeroIndexProps = {
  /**
   * panel — hairline-bordered sidebar card (≥1024px).
   * strip — compact horizontal strip (768–1023px).
   * Hidden below 768px (handled by the parent grid).
   */
  variant?: HeroIndexVariant;
};

/** Server component. Factual index of the three specified projects (§5). */
export function HeroIndex({ variant = "panel" }: HeroIndexProps) {
  if (variant === "strip") {
    return (
      <aside aria-label="Selected work index" className="border-y border-line py-4">
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {PROJECTS.map((project) => (
            <li key={project.id}>
              <a
                href="#work"
                className="no-underline flex items-baseline gap-2 transition-colors duration-200 hover:text-accent"
              >
                <span className="mono-label text-accent">{project.index}</span>
                <span className="text-sm text-ink">{project.shortTitle ?? project.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  return (
    <aside aria-label="Selected work index" className="border border-line bg-paper">
      <p className="mono-label border-b border-line px-5 py-4 text-muted">INDEX — SELECTED WORK</p>
      <ul>
        {PROJECTS.map((project) => (
          <li key={project.id} className="border-b border-line last:border-b-0">
            <a
              href="#work"
              className="no-underline flex items-baseline gap-3 px-5 py-4 transition-colors duration-200 hover:bg-surface"
            >
              <span className="mono-label text-accent">{project.index}</span>
              <span className="text-[15px] font-medium text-ink">
                {project.shortTitle ?? project.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mono-label border-t border-line px-5 py-4 text-muted">
        {`${String(PROJECTS.length).padStart(2, "0")} PROJECTS ↓`}
      </p>
    </aside>
  );
}
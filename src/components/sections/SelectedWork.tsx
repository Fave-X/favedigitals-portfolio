import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/lib/types";

/** Domain-aware external-link label — Project 2 is never claimed to be on Dune. */
function actionLabel(project: Project): string {
  return project.platform === "Dune Analytics" ? "View on dune.com" : "View dashboard";
}

function ProjectRow({ project }: { project: Project }) {
  const action = actionLabel(project);

  return (
    /* The whole row is the external link — single keyboard stop, editorial interaction. */
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${action} (opens in a new tab)`}
      className="no-underline group grid grid-cols-1 gap-6 border-b border-line py-10 transition-colors duration-200 hover:border-line-strong hover:bg-surface lg:grid-cols-12 lg:py-12"
    >
      {/* Meta: number + platform (where known) */}
      <div className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:items-start lg:gap-5">
        <span aria-hidden="true" className="font-mono text-[1.75rem] leading-none text-accent">
          {project.index}
        </span>
        {project.platform ? <MonoLabel>{project.platform}</MonoLabel> : null}
      </div>

      {/* Content: title → category → description → screenshot → action */}
      <div className="lg:col-span-9">
        <h3 className="font-serif font-semibold tracking-[-0.01em] text-h3 text-ink">
          <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
            {project.title}
          </span>
        </h3>

        <MonoLabel className="mt-3">{project.category}</MonoLabel>

        {project.description ? (
          <p className="mt-4 max-w-[60ch] text-ink-2">{project.description}</p>
        ) : null}

        {project.media ? (
          <div className="mt-6 border border-line">
            <Image
              src={project.media.src}
              alt={project.media.alt}
              width={project.media.width}
              height={project.media.height}
              sizes="(min-width: 768px) 66vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <span className="mono-label mt-5 inline-flex items-center gap-1.5 text-accent">
          {action}
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  );
}

/**
 * Selected Work (knowledge.md §17) — editorial case-study rows, not cards.
 * Data comes from src/data/projects.ts; adding a project = appending an entry.
 */
export function SelectedWork() {
  return (
    <SectionShell
      id="work"
      index="01"
      eyebrow="SELECTED WORK"
      title="Selected Work"
      lede="Case studies in on-chain analytics — from protocol dashboards to complete on-chain studies."
    >
      <div className="border-t border-line">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
      <p className="mono-label mt-8 text-muted">More projects will be added.</p>
    </SectionShell>
  );
}
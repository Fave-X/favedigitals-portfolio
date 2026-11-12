import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/layout/SectionShell";
import { ABOUT_COPY, ALSO_USES, TIMELINE, TOOL_PROOF } from "@/data/about";
import { getWork } from "@/data/work";

export function About() {
  return (
    <SectionShell id="about" eyebrow="About" title="How I work">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image
            src="/images/fave-digitals-profile.png"
            alt="Portrait of Favour Tabugbo"
            width={1254}
            height={1254}
            sizes="(min-width: 1024px) 30vw, 320px"
            className="h-auto w-full max-w-xs border border-line grayscale lg:max-w-none"
          />
        </div>

        <div className="space-y-12 lg:col-span-8">
          <div className="max-w-[62ch] space-y-4 text-lede text-ink-2">
            {ABOUT_COPY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div>
            <h3 className="mono-label text-muted">Timeline</h3>
            <ol className="mt-4 border-t border-line">
              {TIMELINE.map((entry) => (
                <li key={entry.what} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[6rem_1fr]">
                  <span className="font-mono text-[14px] tabular-nums text-ink-2">{entry.when}</span>
                  <div>
                    <p className="font-semibold text-ink">{entry.what}</p>
                    <p className="mt-1 text-[15px] text-ink-2">{entry.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mono-label text-muted">Tools, and where to see them</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-y border-line">
                    <th scope="col" className="mono-label py-2.5 pr-4 font-normal text-muted">Tool</th>
                    <th scope="col" className="mono-label py-2.5 font-normal text-muted">Shown in</th>
                  </tr>
                </thead>
                <tbody>
                  {TOOL_PROOF.map((row) => (
                    <tr key={row.tool} className="border-b border-line align-top">
                      <th scope="row" className="py-3 pr-4 font-medium text-ink">{row.tool}</th>
                      <td className="py-3">
                        <span className="flex flex-wrap gap-x-4 gap-y-1">
                          {row.proof.map((slug) => {
                            const item = getWork(slug);
                            return item ? (
                              <Link key={slug} href={`/work/${slug}`} className="text-[15px] text-accent">
                                {item.title}
                              </Link>
                            ) : null;
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[14px] text-muted">Also working with: {ALSO_USES.join(", ")}.</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

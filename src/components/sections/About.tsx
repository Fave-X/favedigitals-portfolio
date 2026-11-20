import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ABOUT_COPY, ALSO_USES, TIMELINE, TOOL_PROOF } from "@/data/about";
import { WORK, exhibitLetter, getWork } from "@/data/work";

const PROFILE: { label: string; value: string }[] = [
  { label: "Name", value: "Favour Tabugbo" },
  { label: "Working as", value: "FaveDigitals" },
  { label: "Based", value: "Lagos, Nigeria (UTC+1)" },
  { label: "In Web3 since", value: "2023" },
  { label: "Trained in", value: "Biochemistry, lab QA/QC" },
];

function letterOf(slug: string) {
  return exhibitLetter(WORK.findIndex((item) => item.slug === slug));
}

/** The investigator profile sheet: ID card, method, record, instruments. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 pt-24 md:pt-32">
      <Container>
        <h2 id="about-title" className="case-title text-h2 text-ink">
          Investigator profile
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="border border-line-strong bg-surface p-4 lg:col-span-4 lg:self-start">
            <Image
              src="/images/fave-digitals-profile.png"
              alt="Portrait of Favour Tabugbo"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 26vw, 320px"
              className="h-auto w-full grayscale contrast-[1.05]"
            />
            <dl className="mt-4 divide-y divide-line">
              {PROFILE.map((row) => (
                <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
                  <dt className="field self-center">{row.label}</dt>
                  <dd className="typed text-[14px] text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-14 lg:col-span-8">
            <div className="max-w-[62ch] space-y-4 text-lede text-ink-2">
              {ABOUT_COPY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div>
              <h3 className="case-title text-[1.6rem] text-ink [font-stretch:80%]">Record</h3>
              <ol className="mt-4 border-t border-line-strong">
                {TIMELINE.map((entry) => (
                  <li key={entry.what} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-4">
                    <span className="typed text-[15px] text-ink">{entry.when}</span>
                    <div>
                      <p className="font-semibold text-ink">{entry.what}</p>
                      <p className="mt-1 text-[15px] text-ink-2">{entry.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="case-title text-[1.6rem] text-ink [font-stretch:80%]">Instruments, and where they were used</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-y border-line-strong">
                      <th scope="col" className="field py-2.5 pr-4 font-semibold">Instrument</th>
                      <th scope="col" className="field py-2.5 font-semibold">Exhibits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOOL_PROOF.map((row) => (
                      <tr key={row.tool} className="border-b border-line align-top">
                        <th scope="row" className="py-3 pr-4 font-medium text-ink">{row.tool}</th>
                        <td className="py-3">
                          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {row.proof.map((slug) => {
                              const item = getWork(slug);
                              return item ? (
                                <Link key={slug} href={`/work/${slug}`} className="text-[15px]">
                                  <span className="typed">{letterOf(slug)}</span> {item.title}
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
              <p className="mt-4 text-[14.5px] text-muted">Also working with: {ALSO_USES.join(", ")}.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

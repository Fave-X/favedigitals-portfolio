import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { CHANNELS } from "@/data/contact";
import { SITE } from "@/data/site";

/** The back page of the file: how to reach the investigator. */
export function Contact() {
  const links = CHANNELS.filter((channel) => channel.kind === "external" && channel.id !== "dune");
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 pt-24 pb-20 md:pt-32 md:pb-28">
      <Container>
        <div className="border border-line-strong bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-6 md:p-10 lg:col-span-7 lg:border-r lg:border-line">
              <h2 id="contact-title" className="case-title text-h2 text-ink">
                Hiring for investigations or on-chain analytics?
              </h2>
              <p className="mt-5 max-w-[50ch] text-lede text-ink-2">
                Email is the quickest way to reach me. I&apos;m based in Lagos (UTC+1) and open to remote roles.
              </p>
              <p className="mt-8 field">Email</p>
              <p className="typed mt-1 break-all text-[clamp(1.15rem,2.4vw,1.6rem)] text-ink">{SITE.email}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CopyEmail />
                <a
                  href={SITE.cv}
                  download
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-line-strong px-5 text-[15px] font-semibold no-underline hover:border-accent"
                >
                  <Download size={16} aria-hidden="true" />
                  Download CV (PDF)
                </a>
              </div>
            </div>
            <ul className="border-t border-line p-6 md:p-10 lg:col-span-5 lg:border-t-0">
              <li className="field pb-3">Elsewhere</li>
              {links.map((channel) => (
                <li key={channel.id} className="border-t border-line">
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-3.5 text-ink no-underline"
                  >
                    <span className="text-[15.5px]">{channel.label}</span>
                    <span className="typed flex items-center gap-2 text-[14px] text-accent group-hover:underline">
                      {channel.handle}
                      <ArrowUpRight size={14} aria-hidden="true" className="arrow-shift" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

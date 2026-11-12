import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { CHANNELS } from "@/data/contact";
import { SITE } from "@/data/site";

export function Contact() {
  const links = CHANNELS.filter((channel) => channel.kind === "external");
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line bg-surface-raised">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mono-label text-ink-2">Contact</p>
            <h2 id="contact-title" className="mt-3 max-w-[22ch] font-serif text-h2 font-semibold tracking-[-0.01em] text-ink">
              Hiring for on-chain analytics or investigations?
            </h2>
            <p className="mt-4 max-w-[52ch] text-lede text-ink-2">
              Email is the quickest way to reach me. Based in {SITE.location}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${SITE.email}`}
                className="no-underline inline-flex min-h-11 items-center justify-center bg-accent px-6 text-[15px] font-medium text-paper transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                {SITE.email}
              </a>
              <CopyEmail />
            </div>
            <a href={SITE.cv} download className="mt-5 inline-flex items-center gap-2 text-[15px]">
              Download my CV (PDF)
            </a>
          </div>

          <ul className="border-t border-line-strong lg:col-span-5">
            {links.map((channel) => (
              <li key={channel.id} className="border-b border-line-strong">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline group flex items-center justify-between gap-4 py-3.5 text-ink"
                >
                  <span className="text-[15px]">{channel.label}</span>
                  <span className="flex items-center gap-2 font-mono text-[13px] text-accent">
                    {channel.handle}
                    <ArrowUpRight size={14} aria-hidden="true" className="arrow-shift" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

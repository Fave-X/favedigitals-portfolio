import Link from "next/link";
import { Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SITE } from "@/data/site";

/** The file's spine: the wordmark, the section tabs, and the CV. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-strong bg-paper">
      <Container>
        <div className="flex h-16 items-end justify-between">
          <Link
            href="/"
            className="case-title mb-[13px] text-[1.35rem] leading-none text-ink no-underline [font-stretch:78%] hover:text-accent"
            aria-label="FaveDigitals, home"
          >
            FaveDigitals
          </Link>

          <div className="flex items-end gap-2 sm:gap-4">
            <DesktopNav className="hidden md:block" />
            <div className="hidden h-11 items-center md:flex">
            <a
              href={SITE.cv}
              download
              className="inline-flex min-h-10 items-center gap-2 bg-accent px-4 text-[14.5px] font-semibold text-on-accent no-underline transition-colors hover:bg-accent-deep"
            >
              <Download size={15} aria-hidden="true" />
              CV
            </a>
            </div>
            <div className="flex h-11 items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <div className="md:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

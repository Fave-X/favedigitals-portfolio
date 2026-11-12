import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="no-underline flex items-baseline gap-2 text-ink hover:text-accent" aria-label="FaveDigitals, home">
            <span className="text-[17px] font-semibold">FaveDigitals</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <DesktopNav className="hidden md:block" />
            <Link
              href="/#contact"
              className="no-underline hidden min-h-10 items-center bg-accent px-4 text-[14px] font-medium text-paper transition-colors hover:bg-accent-deep md:inline-flex"
            >
              Get in touch
            </Link>
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}

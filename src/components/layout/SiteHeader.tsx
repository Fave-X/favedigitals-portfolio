import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Sticky site header: 64px tall, solid paper, 1px bottom hairline.
 * No blur, no transparency, no shadow. Desktop nav ≥768px, menu button below.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="no-underline text-[17px] font-semibold text-ink"
            aria-label="FaveDigitals — back to top"
          >
            FaveDigitals
          </a>

          <div className="flex items-center">
            <DesktopNav className="hidden md:block" />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
import { Container } from "@/components/layout/Container";
import { SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-footer pb-20 text-footer-text md:pb-0">
      <Container>
        <div className="flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[15px]">
            {SITE.name} <span className="text-footer-text/60">· {SITE.brand}</span>
          </p>
          <p className="font-mono text-[12px] text-footer-text/60">
            Figures link to their published source · © 2026
          </p>
        </div>
      </Container>
    </footer>
  );
}

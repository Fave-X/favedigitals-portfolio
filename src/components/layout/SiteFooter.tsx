import { Container } from "@/components/layout/Container";
import { SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-strong bg-footer pb-24 text-footer-text md:pb-0">
      <Container>
        <div className="flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[15px]">
            {SITE.brand} <span className="opacity-70">· {SITE.name}</span>
          </p>
          <p className="text-[13.5px] opacity-70">Every figure links to its published source. © 2026</p>
        </div>
      </Container>
    </footer>
  );
}

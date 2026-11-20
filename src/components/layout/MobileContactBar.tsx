import { Download } from "lucide-react";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SITE } from "@/data/site";

/** Phone-only bar: contact and CV are always one tap away. */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line-strong bg-paper px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] md:hidden">
      <div className="flex gap-2">
        <a
          href={SITE.cv}
          download
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-line-strong text-[15px] font-semibold no-underline"
        >
          <Download size={16} aria-hidden="true" />
          CV
        </a>
        <CopyEmail className="flex-[1.6]" />
      </div>
    </div>
  );
}

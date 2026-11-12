import Link from "next/link";
import { CopyEmail } from "@/components/ui/CopyEmail";

/** Phone-only bar so contact is always one tap away. */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <div className="flex gap-2">
        <Link
          href="/#work"
          className="no-underline inline-flex min-h-11 flex-1 items-center justify-center border border-line text-[15px] text-accent"
        >
          Work
        </Link>
        <CopyEmail className="flex-[1.4]" />
      </div>
    </div>
  );
}

import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Wordmark badge: a solid square with a tilted bar mark, plus a
 * two-tone brand name hidden on the smallest screens.
 */
export default function Logo() {
  return (
    <span className="inline-flex items-center gap-1.5 leading-none">
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-xl border-2 border-primary bg-primary",
          "sm:h-6 sm:w-6 sm:rounded-lg",
        )}
      >
        <span className={cn("h-3.5 w-0.5 rotate-12 rounded-full bg-white", "sm:h-3")} />
      </span>
      <span className="hidden sm:block text-xl font-black">
        <span className="text-foreground">{SITE.brand.first}</span>
        <span className="text-primary">{SITE.brand.second}</span>
      </span>
    </span>
  );
}

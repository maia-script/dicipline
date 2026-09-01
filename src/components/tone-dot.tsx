import { cn, toneDot } from "@/lib/utils";
import type { SubjectTone } from "@/lib/types";

export function ToneDot({ tone, className }: { tone?: SubjectTone; className?: string }) {
  return (
    <span
      className={cn("inline-block size-2 shrink-0 rounded-full", toneDot(tone), className)}
      aria-hidden
    />
  );
}

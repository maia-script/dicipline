import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("relative inline-flex size-8 items-center justify-center", className)}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full border border-foreground/35" />
      <span className="absolute inset-1.5 rounded-full border border-foreground/20" />
      <span className="size-1.5 rounded-full bg-primary" />
    </span>
  );
}

export function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <BrandMark />
      <div className="min-w-0 leading-none">
        <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Dynamic
        </p>
        <p className={cn("font-serif italic tracking-tight", compact ? "text-lg" : "text-xl")}>
          Obsession
        </p>
      </div>
    </div>
  );
}

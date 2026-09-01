import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  hint,
  action,
  className,
}: {
  icon: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl bg-card px-6 py-12 text-center shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <div className="text-muted-foreground">{icon}</div>
      <div className="space-y-1">
        <p className="font-serif text-lg">{title}</p>
        {hint ? <p className="max-w-xs text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

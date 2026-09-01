import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        {kicker ? (
          <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {kicker}
          </p>
        ) : null}
        <h1 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">{title}</h1>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

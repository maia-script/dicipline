import { cn } from "@/lib/utils";

export function GoalRing({
  value,
  max,
  label,
  unit = "min",
  className,
}: {
  value: number;
  max: number;
  label: string;
  unit?: string;
  className?: string;
}) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const pct = max <= 0 ? 0 : Math.min(1, value / max);
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            className="stroke-secondary"
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            className="stroke-primary"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl tabular-nums leading-none">{Math.round(value)}</span>
          <span className="mt-1 text-[10px] tracking-wide text-muted-foreground uppercase">
            / {max} {unit}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

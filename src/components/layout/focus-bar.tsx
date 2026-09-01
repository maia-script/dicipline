import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatClock } from "@/lib/dates";
import { useAppStore } from "@/lib/store";
import { useNow } from "@/hooks/use-now";

export function FocusBar() {
  const timer = useAppStore((s) => s.timer);
  const blocks = useAppStore((s) => s.studyBlocks);
  const pauseTimer = useAppStore((s) => s.pauseTimer);
  const startTimer = useAppStore((s) => s.startTimer);
  const stopTimer = useAppStore((s) => s.stopTimer);
  const now = useNow(1000);

  if (!timer.blockId) return null;
  const block = blocks.find((b) => b.id === timer.blockId);
  if (!block) return null;

  const ms =
    timer.running && timer.startedAt
      ? timer.accumulatedMs + Math.max(0, now - timer.startedAt)
      : timer.accumulatedMs;

  return (
    <div className="fixed inset-x-3 z-40 rounded-xl border border-border bg-popover/95 px-3 py-2.5 shadow-[var(--shadow-border-hover)] backdrop-blur-sm bottom-[4.75rem] md:inset-x-auto md:right-6 md:bottom-6 md:w-[22rem]">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{block.content}</p>
          <p className="mt-0.5 font-serif text-lg tabular-nums leading-none">
            {formatClock(ms)}
            <span className="ml-2 text-xs text-muted-foreground">meta {block.minutesGoal} min</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          {timer.running ? (
            <Button size="icon-sm" variant="secondary" onClick={pauseTimer} aria-label="Pausar">
              <Pause className="size-4" />
            </Button>
          ) : (
            <Button
              size="icon-sm"
              variant="secondary"
              onClick={() => startTimer(block.id)}
              aria-label="Retomar"
            >
              <Play className="size-4" />
            </Button>
          )}
          <Button size="icon-sm" variant="ghost" onClick={stopTimer} aria-label="Encerrar e salvar">
            <Square className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { MoreHorizontal, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ToneDot } from "@/components/tone-dot";
import { subjectName, subjectTone } from "@/lib/schedule";
import { useAppStore } from "@/lib/store";
import type { StudyBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StudyBlockCard({
  block,
  onEdit,
}: {
  block: StudyBlock;
  onEdit?: (block: StudyBlock) => void;
}) {
  const subjects = useAppStore((s) => s.subjects);
  const startTimer = useAppStore((s) => s.startTimer);
  const updateStudyBlock = useAppStore((s) => s.updateStudyBlock);
  const removeStudyBlock = useAppStore((s) => s.removeStudyBlock);
  const pct = block.minutesGoal <= 0 ? 0 : Math.min(100, (block.minutesDone / block.minutesGoal) * 100);
  const name = subjectName(subjects, block.subjectId);

  return (
    <div className="rounded-xl bg-secondary/60 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={cn("font-medium leading-snug", block.done && "text-muted-foreground")}>
            {block.content}
          </p>
          {name ? (
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ToneDot tone={subjectTone(subjects, block.subjectId)} />
              {name}
            </p>
          ) : null}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-sm" variant="ghost" aria-label="Ações">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit ? <DropdownMenuItem onClick={() => onEdit(block)}>Editar</DropdownMenuItem> : null}
            <DropdownMenuItem
              onClick={() => updateStudyBlock(block.id, { done: !block.done })}
            >
              {block.done ? "Reabrir" : "Concluir"}
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => removeStudyBlock(block.id)}>
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Progress value={pct} className="flex-1" />
        <span className="text-xs tabular-nums text-muted-foreground">
          {block.minutesDone}/{block.minutesGoal} min
        </span>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="mt-3"
        onClick={() => startTimer(block.id)}
      >
        <Play className="size-3.5" />
        Foco
      </Button>
    </div>
  );
}

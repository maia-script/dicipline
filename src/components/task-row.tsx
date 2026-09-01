import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToneDot } from "@/components/tone-dot";
import { formatDayLong } from "@/lib/dates";
import { PRIORITY_LABEL, TASK_KIND_LABEL, subjectName, subjectTone } from "@/lib/schedule";
import { assignToToday, useAppStore } from "@/lib/store";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TaskRow({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: (task: Task) => void;
}) {
  const subjects = useAppStore((s) => s.subjects);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const removeTask = useAppStore((s) => s.removeTask);
  const name = subjectName(subjects, task.subjectId);
  const tone = subjectTone(subjects, task.subjectId);
  const overdue = Boolean(task.dueDate && !task.done && task.dueDate < new Date().toISOString().slice(0, 10));

  return (
    <div className="flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-accent/60">
      <Checkbox
        checked={task.done}
        onCheckedChange={() => toggleTask(task.id)}
        className="mt-0.5"
        aria-label={task.title}
      />
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm leading-snug", task.done && "text-muted-foreground line-through")}>
          {task.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {name ? (
            <span className="inline-flex items-center gap-1.5">
              <ToneDot tone={tone} />
              {name}
            </span>
          ) : null}
          <Badge variant="outline">{TASK_KIND_LABEL[task.kind]}</Badge>
          {task.priority === "alta" ? <Badge variant="danger">{PRIORITY_LABEL[task.priority]}</Badge> : null}
          {task.dueDate ? (
            <span className={overdue ? "text-destructive" : ""}>{formatDayLong(task.dueDate)}</span>
          ) : null}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="ghost" aria-label="Ações">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(task)}>Editar</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              assignToToday({
                content: task.title,
                subjectId: task.subjectId,
                taskId: task.id,
                folderId: task.folderId,
              })
            }
          >
            Estudar hoje
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => removeTask(task.id)}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

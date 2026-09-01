import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Plus } from "lucide-react";
import { TaskForm } from "@/components/forms/task-form";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { TaskRow } from "@/components/task-row";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { todayIso } from "@/lib/dates";
import { overdueTasks } from "@/lib/stats";
import { useAppStore } from "@/lib/store";
import type { Task, TaskKind } from "@/lib/types";

export const Route = createFileRoute("/_app/tarefas")({
  component: TasksPage,
});

type Filter = "abertas" | "hoje" | "atrasadas" | "feitas";

function TasksPage() {
  const tasks = useAppStore((s) => s.tasks);
  const [filter, setFilter] = useState<Filter>("abertas");
  const [kind, setKind] = useState<"todas" | TaskKind>("todas");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | undefined>();
  const today = todayIso();

  const visible = useMemo(() => {
    return tasks
      .filter((t) => {
        if (kind !== "todas" && t.kind !== kind) return false;
        if (filter === "abertas") return !t.done;
        if (filter === "hoje") return !t.done && t.dueDate === today;
        if (filter === "atrasadas") return !t.done && Boolean(t.dueDate && t.dueDate < today);
        return t.done;
      })
      .sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999"));
  }, [tasks, filter, kind, today]);

  const late = overdueTasks(tasks).length;

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Checklist"
        title="Tarefas"
        action={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            Nova
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="abertas">Abertas</TabsTrigger>
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="atrasadas">
              Atrasadas{late ? ` ${late}` : ""}
            </TabsTrigger>
            <TabsTrigger value="feitas">Feitas</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs value={kind} onValueChange={(v) => setKind(v as typeof kind)}>
          <TabsList>
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="tarefa">Tarefa</TabsTrigger>
            <TabsTrigger value="trabalho">Trabalho</TabsTrigger>
            <TabsTrigger value="prova">Prova</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<ListChecks className="size-8" strokeWidth={1.4} />}
          title="Nada nesta lista"
          hint="Crie uma tarefa, um trabalho ou uma prova e atribua um prazo."
          action={
            <Button onClick={() => setOpen(true)}>
              <Plus className="size-4" />
              Nova tarefa
            </Button>
          }
        />
      ) : (
        <div className="rounded-2xl bg-card p-2 shadow-[var(--shadow-border)] sm:p-3">
          {visible.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onEdit={(task) => {
                setEditing(task);
                setOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <TaskForm
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setEditing(undefined);
        }}
        task={editing}
      />
    </div>
  );
}

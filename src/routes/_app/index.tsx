import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { EventForm } from "@/components/forms/event-form";
import { StudyForm } from "@/components/forms/study-form";
import { TaskForm } from "@/components/forms/task-form";
import { PageHeader } from "@/components/layout/page-header";
import { StudyBlockCard } from "@/components/study-block-card";
import { TaskRow } from "@/components/task-row";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDayFull, minutesUntil, todayIso } from "@/lib/dates";
import { dayItems, KIND_LABEL, soonestUpcoming, subjectName } from "@/lib/schedule";
import { openTasksDueToday, streakDays, todayMinutes, weekMinutes } from "@/lib/stats";
import { useAppStore } from "@/lib/store";
import type { StudyBlock, Task } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: TodayPage,
});

function TodayPage() {
  const today = todayIso();
  const events = useAppStore((s) => s.events);
  const slots = useAppStore((s) => s.slots);
  const tasks = useAppStore((s) => s.tasks);
  const subjects = useAppStore((s) => s.subjects);
  const blocks = useAppStore((s) => s.studyBlocks);
  const goals = useAppStore((s) => s.goals);
  const [taskOpen, setTaskOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [editingBlock, setEditingBlock] = useState<StudyBlock | undefined>();

  const timeline = dayItems(today, events, slots);
  const todayBlocks = blocks.filter((b) => b.date === today);
  const todayTasks = openTasksDueToday(tasks);
  const otherOpen = tasks.filter((t) => !t.done && t.dueDate !== today).slice(0, 4);
  const mins = todayMinutes(blocks);
  const week = weekMinutes(blocks);
  const streak = streakDays(blocks);
  const soon = soonestUpcoming(today, events, slots, 180);

  return (
    <div className="space-y-8">
      <PageHeader
        kicker={formatDayFull()}
        title="Hoje"
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setEventOpen(true)}>
              Evento
            </Button>
            <Button size="sm" onClick={() => setTaskOpen(true)}>
              <Plus className="size-4" />
              Tarefa
            </Button>
          </div>
        }
      />

      <section className="grid grid-cols-3 gap-3">
        <Stat label="Sequência" value={`${streak}`} hint="dias" />
        <Stat label="Hoje" value={`${mins}`} hint={`de ${goals.dailyMinutes} min`} />
        <Stat label="Semana" value={`${week}`} hint={`de ${goals.weeklyMinutes} min`} />
      </section>

      {soon ? (
        <div className="rounded-2xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
          <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Próximo
          </p>
          <p className="mt-1 font-serif text-2xl">{soon.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {soon.time}
            {soon.minutesAway !== undefined && soon.minutesAway >= 0
              ? ` · em ${soon.minutesAway} min`
              : " · agora"}
            {` · ${KIND_LABEL[soon.kind]}`}
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Agenda do dia</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setEventOpen(true)}>
              Marcar
            </Button>
          </CardHeader>
          <CardContent>
            {timeline.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">Nada marcado neste dia.</p>
            ) : (
              <ol className="relative space-y-0 border-l border-border ml-2">
                {timeline.map((item) => {
                  const away = item.time ? minutesUntil(today, item.time) : undefined;
                  const live = away !== undefined && away <= 0 && away > -90;
                  return (
                    <li key={`${item.source}-${item.id}`} className="relative py-3 pl-5">
                      <span
                        className={cn(
                          "absolute top-5 -left-1.5 size-3 rounded-full",
                          live ? "bg-primary" : "bg-muted-foreground/40",
                        )}
                      />
                      <p className="text-xs tabular-nums text-muted-foreground">
                        {item.time ?? "—"}
                        {item.end ? `–${item.end}` : ""}
                      </p>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {KIND_LABEL[item.kind]}
                        {subjectName(subjects, item.subjectId)
                          ? ` · ${subjectName(subjects, item.subjectId)}`
                          : ""}
                      </p>
                    </li>
                  );
                })}
              </ol>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Checklist</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setTaskOpen(true)}>
              Nova
            </Button>
          </CardHeader>
          <CardContent className="-mx-2">
            {todayTasks.length === 0 && otherOpen.length === 0 ? (
              <p className="px-2 py-6 text-sm text-muted-foreground">Nenhuma tarefa em aberto.</p>
            ) : (
              <div className="space-y-1">
                {todayTasks.map((t) => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onEdit={(task) => {
                      setEditingTask(task);
                      setTaskOpen(true);
                    }}
                  />
                ))}
                {otherOpen.map((t) => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onEdit={(task) => {
                      setEditingTask(task);
                      setTaskOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Estudo do dia</h2>
          <Button size="sm" variant="outline" onClick={() => setStudyOpen(true)}>
            Atribuir conteúdo
          </Button>
        </div>
        {todayBlocks.length === 0 ? (
          <p className="rounded-2xl bg-card px-5 py-8 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
            Nada atribuído para hoje. Escolha um arquivo ou tarefa na aba Estudos.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {todayBlocks.map((b) => (
              <StudyBlockCard
                key={b.id}
                block={b}
                onEdit={(block) => {
                  setEditingBlock(block);
                  setStudyOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </section>

      <TaskForm
        open={taskOpen}
        onOpenChange={(v) => {
          setTaskOpen(v);
          if (!v) setEditingTask(undefined);
        }}
        task={editingTask}
        defaults={{ dueDate: today }}
      />
      <EventForm open={eventOpen} onOpenChange={setEventOpen} defaults={{ date: today }} />
      <StudyForm
        open={studyOpen}
        onOpenChange={(v) => {
          setStudyOpen(v);
          if (!v) setEditingBlock(undefined);
        }}
        block={editingBlock}
        defaults={{ date: today }}
      />
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-serif text-2xl tabular-nums leading-none md:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

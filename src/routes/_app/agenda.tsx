import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Plus } from "lucide-react";
import { EventForm } from "@/components/forms/event-form";
import { Field } from "@/components/forms/fields";
import { PageHeader } from "@/components/layout/page-header";
import { ToneDot } from "@/components/tone-dot";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { formatDayFull, formatDayLong, parseDay, WEEKDAYS_MON } from "@/lib/dates";
import { dayItems, KIND_LABEL, subjectName, subjectTone } from "@/lib/schedule";
import { useAppStore } from "@/lib/store";
import type { StudyEvent } from "@/lib/types";

export const Route = createFileRoute("/_app/agenda")({
  component: AgendaPage,
});

const NONE = "__none";

function AgendaPage() {
  const events = useAppStore((s) => s.events);
  const slots = useAppStore((s) => s.slots);
  const subjects = useAppStore((s) => s.subjects);
  const removeEvent = useAppStore((s) => s.removeEvent);
  const addSlot = useAppStore((s) => s.addSlot);
  const removeSlot = useAppStore((s) => s.removeSlot);
  const [selected, setSelected] = useState<Date>(new Date());
  const [eventOpen, setEventOpen] = useState(false);
  const [editing, setEditing] = useState<StudyEvent | undefined>();
  const [slotOpen, setSlotOpen] = useState(false);

  const iso = format(selected, "yyyy-MM-dd");
  const items = dayItems(iso, events, slots);
  const daysWithEvents = useMemo(
    () => events.map((e) => parseDay(e.date)),
    [events],
  );
  const upcoming = [...events]
    .filter((e) => e.date >= format(new Date(), "yyyy-MM-dd"))
    .sort((a, b) => `${a.date}${a.time ?? ""}`.localeCompare(`${b.date}${b.time ?? ""}`))
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Calendário"
        title="Agenda"
        action={
          <Button size="sm" onClick={() => setEventOpen(true)}>
            <Plus className="size-4" />
            Evento
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="w-full lg:w-fit">
          <CardContent className="pt-1">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={(d) => d && setSelected(d)}
              modifiers={{ marked: daysWithEvents }}
              modifiersClassNames={{
                marked: "[&>button]:underline [&>button]:underline-offset-4",
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{formatDayFull(iso)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <p className="py-8 text-sm text-muted-foreground">Nenhum compromisso neste dia.</p>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.source}-${item.id}`}
                  className="flex items-start justify-between gap-3 rounded-xl bg-secondary/50 px-3 py-3"
                >
                  <div>
                    <p className="text-xs tabular-nums text-muted-foreground">
                      {item.time ?? "Dia inteiro"}
                      {item.end ? `–${item.end}` : ""}
                    </p>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ToneDot tone={subjectTone(subjects, item.subjectId)} />
                      {KIND_LABEL[item.kind]}
                      {subjectName(subjects, item.subjectId)
                        ? ` · ${subjectName(subjects, item.subjectId)}`
                        : ""}
                    </p>
                  </div>
                  {item.source === "event" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon-sm" variant="ghost" aria-label="Ações">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            const ev = events.find((e) => e.id === item.id);
                            if (ev) {
                              setEditing(ev);
                              setEventOpen(true);
                            }
                          }}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => removeEvent(item.id)}>
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </div>
              ))
            )}
            <Button variant="outline" className="w-full" onClick={() => setEventOpen(true)}>
              Adicionar neste dia
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>À frente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum evento futuro.</p>
            ) : (
              upcoming.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className="flex w-full items-baseline justify-between gap-3 rounded-lg px-2 py-2 text-left hover:bg-accent"
                  onClick={() => setSelected(parseDay(e.date))}
                >
                  <span className="truncate text-sm">{e.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDayLong(e.date)}
                    {e.time ? ` · ${e.time}` : ""}
                  </span>
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Horário semanal</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setSlotOpen(true)}>
              Faixa
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {WEEKDAYS_MON.map((day) => {
              const daySlots = slots
                .filter((s) => s.weekday === day.i)
                .sort((a, b) => a.start.localeCompare(b.start));
              return (
                <div key={day.i}>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {day.label}
                  </p>
                  {daySlots.length === 0 ? (
                    <p className="py-1 text-sm text-muted-foreground/70">—</p>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      {daySlots.map((s) => (
                        <li key={s.id} className="flex items-center justify-between gap-2 text-sm">
                          <span>
                            <span className="tabular-nums text-muted-foreground">
                              {s.start}–{s.end}
                            </span>{" "}
                            {s.title}
                          </span>
                          <button
                            type="button"
                            className="text-xs text-muted-foreground hover:text-destructive"
                            onClick={() => removeSlot(s.id)}
                          >
                            tirar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <EventForm
        open={eventOpen}
        onOpenChange={(v) => {
          setEventOpen(v);
          if (!v) setEditing(undefined);
        }}
        event={editing}
        defaults={{ date: iso }}
      />
      <SlotDialog
        open={slotOpen}
        onOpenChange={setSlotOpen}
        onSave={(slot) => {
          addSlot(slot);
          setSlotOpen(false);
        }}
      />
    </div>
  );
}

function SlotDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (slot: { weekday: number; start: string; end: string; title: string; subjectId?: string }) => void;
}) {
  const subjects = useAppStore((s) => s.subjects);
  const [weekday, setWeekday] = useState("1");
  const [start, setStart] = useState("19:00");
  const [end, setEnd] = useState("21:00");
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(NONE);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faixa de horário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Field label="Título">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Dia">
            <Select value={weekday} onValueChange={setWeekday}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WEEKDAYS_MON.map((d) => (
                  <SelectItem key={d.i} value={String(d.i)}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Início">
              <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
            </Field>
            <Field label="Fim">
              <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
            </Field>
          </div>
          <Field label="Matéria">
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>Nenhuma</SelectItem>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() =>
              onSave({
                weekday: Number(weekday),
                start,
                end,
                title: title.trim() || "Estudo",
                subjectId: subjectId === NONE ? undefined : subjectId,
              })
            }
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

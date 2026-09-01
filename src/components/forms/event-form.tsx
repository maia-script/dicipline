import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/forms/fields";
import { todayIso } from "@/lib/dates";
import { useAppStore } from "@/lib/store";
import type { EventKind, StudyEvent } from "@/lib/types";

const NONE = "__none";

export function EventForm({
  open,
  onOpenChange,
  event,
  defaults,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  event?: StudyEvent;
  defaults?: Partial<Pick<StudyEvent, "date" | "subjectId">>;
}) {
  const subjects = useAppStore((s) => s.subjects);
  const addEvent = useAppStore((s) => s.addEvent);
  const updateEvent = useAppStore((s) => s.updateEvent);
  const [title, setTitle] = useState(event?.title ?? "");
  const [date, setDate] = useState(event?.date ?? defaults?.date ?? todayIso());
  const [time, setTime] = useState(event?.time ?? "19:00");
  const [durationMin, setDurationMin] = useState(String(event?.durationMin ?? 60));
  const [kind, setKind] = useState<EventKind>(event?.kind ?? "estudo");
  const [remindMinutes, setRemindMinutes] = useState(String(event?.remindMinutes ?? 30));
  const [subjectId, setSubjectId] = useState(event?.subjectId ?? defaults?.subjectId ?? NONE);
  const [notes, setNotes] = useState(event?.notes ?? "");

  useEffect(() => {
    if (!open) return;
    setTitle(event?.title ?? "");
    setDate(event?.date ?? defaults?.date ?? todayIso());
    setTime(event?.time ?? "19:00");
    setDurationMin(String(event?.durationMin ?? 60));
    setKind(event?.kind ?? "estudo");
    setRemindMinutes(String(event?.remindMinutes ?? 30));
    setSubjectId(event?.subjectId ?? defaults?.subjectId ?? NONE);
    setNotes(event?.notes ?? "");
  }, [open, event, defaults?.date, defaults?.subjectId]);

  function save() {
    const payload = {
      title: title.trim() || "Sem título",
      date,
      time: time || undefined,
      durationMin: Number(durationMin) || 60,
      kind,
      remindMinutes: Number(remindMinutes) || 30,
      subjectId: subjectId === NONE ? undefined : subjectId,
      notes,
    };
    if (event) updateEvent(event.id, payload);
    else addEvent(payload);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event ? "Editar evento" : "Novo evento"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Field label="Título">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Data">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Horário">
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Duração (min)">
              <Input
                type="number"
                min={5}
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
              />
            </Field>
            <Field label="Aviso">
              <Select value={remindMinutes} onValueChange={setRemindMinutes}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 minutos antes</SelectItem>
                  <SelectItem value="30">30 minutos antes</SelectItem>
                  <SelectItem value="60">1 hora antes</SelectItem>
                  <SelectItem value="120">2 horas antes</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo">
              <Select value={kind} onValueChange={(v) => setKind(v as EventKind)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aula">Aula</SelectItem>
                  <SelectItem value="estudo">Estudo</SelectItem>
                  <SelectItem value="prova">Prova</SelectItem>
                  <SelectItem value="entrega">Entrega</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </Field>
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
          <Field label="Notas">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={save}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

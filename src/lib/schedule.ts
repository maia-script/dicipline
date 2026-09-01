import { minutesUntil, parseDateTime, weekdayIndex } from "./dates";
import type { StudyEvent, Subject, WeekSlot } from "./types";

export type DayItem = {
  id: string;
  title: string;
  time?: string;
  end?: string;
  kind: StudyEvent["kind"] | "horario";
  source: "event" | "slot";
  subjectId?: string;
  minutesAway?: number;
  durationMin?: number;
};

export function dayItems(
  date: string,
  events: StudyEvent[],
  slots: WeekSlot[],
): DayItem[] {
  const weekday = weekdayIndex(date);
  const fromEvents: DayItem[] = events
    .filter((e) => e.date === date)
    .map((e) => ({
      id: e.id,
      title: e.title,
      time: e.time,
      kind: e.kind,
      source: "event" as const,
      subjectId: e.subjectId,
      durationMin: e.durationMin,
      minutesAway: e.time ? minutesUntil(e.date, e.time) : undefined,
    }));

  const occupied = new Set(fromEvents.map((e) => e.time).filter(Boolean));

  const fromSlots: DayItem[] = slots
    .filter((s) => s.weekday === weekday && !occupied.has(s.start))
    .map((s) => ({
      id: s.id,
      title: s.title,
      time: s.start,
      end: s.end,
      kind: "horario" as const,
      source: "slot" as const,
      subjectId: s.subjectId,
      minutesAway: minutesUntil(date, s.start),
    }));

  return [...fromEvents, ...fromSlots].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
}

export function soonestUpcoming(
  date: string,
  events: StudyEvent[],
  slots: WeekSlot[],
  withinMin = 180,
) {
  const now = Date.now();
  return dayItems(date, events, slots)
    .filter((item) => {
      if (!item.time) return false;
      const start = parseDateTime(date, item.time).getTime();
      const delta = (start - now) / 60000;
      return delta >= -5 && delta <= withinMin;
    })
    .sort((a, b) => (a.minutesAway ?? 0) - (b.minutesAway ?? 0))[0];
}

export function subjectName(subjects: Subject[], id?: string) {
  if (!id) return undefined;
  return subjects.find((s) => s.id === id)?.name;
}

export function subjectTone(subjects: Subject[], id?: string) {
  if (!id) return undefined;
  return subjects.find((s) => s.id === id)?.tone;
}

export const KIND_LABEL: Record<StudyEvent["kind"] | "horario", string> = {
  aula: "Aula",
  estudo: "Estudo",
  prova: "Prova",
  entrega: "Entrega",
  outro: "Evento",
  horario: "Horário",
};

export const TASK_KIND_LABEL = {
  tarefa: "Tarefa",
  trabalho: "Trabalho",
  prova: "Prova",
} as const;

export const PRIORITY_LABEL = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
} as const;

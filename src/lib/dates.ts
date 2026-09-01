import {
  addDays,
  addMinutes,
  differenceInMinutes,
  endOfWeek,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parse,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function todayIso() {
  return format(new Date(), "yyyy-MM-dd");
}

export function isoOffset(days: number) {
  return format(addDays(new Date(), days), "yyyy-MM-dd");
}

export function parseDay(iso: string) {
  return parse(iso, "yyyy-MM-dd", new Date());
}

export function parseDateTime(date: string, time = "08:00") {
  return parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());
}

export function formatDayLong(iso: string) {
  const d = parseDay(iso);
  if (isToday(d)) return "Hoje";
  if (isTomorrow(d)) return "Amanhã";
  if (isYesterday(d)) return "Ontem";
  return format(d, "EEE, d MMM", { locale: ptBR });
}

export function formatDayFull(iso?: string) {
  const d = iso ? parseDay(iso) : new Date();
  return format(d, "EEEE, d 'de' MMMM", { locale: ptBR });
}

export function formatMonthTitle(d: Date) {
  return format(d, "MMMM yyyy", { locale: ptBR });
}

export function weekdayIndex(iso: string) {
  return parseDay(iso).getDay();
}

export function weekBounds(d = new Date()) {
  return {
    start: startOfWeek(d, { weekStartsOn: 1 }),
    end: endOfWeek(d, { weekStartsOn: 1 }),
  };
}

export function isInWeek(iso: string, d = new Date()) {
  const day = startOfDay(parseDay(iso));
  const { start, end } = weekBounds(d);
  return day >= startOfDay(start) && day <= startOfDay(end);
}

export function minutesUntil(date: string, time?: string) {
  return differenceInMinutes(parseDateTime(date, time), new Date());
}

export function eventStart(date: string, time?: string) {
  return parseDateTime(date, time);
}

export function eventEnd(date: string, time: string | undefined, durationMin = 60) {
  return addMinutes(parseDateTime(date, time), durationMin);
}

export function formatClock(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export const WEEKDAYS_MON = [
  { i: 1, short: "Seg", label: "Segunda" },
  { i: 2, short: "Ter", label: "Terça" },
  { i: 3, short: "Qua", label: "Quarta" },
  { i: 4, short: "Qui", label: "Quinta" },
  { i: 5, short: "Sex", label: "Sexta" },
  { i: 6, short: "Sáb", label: "Sábado" },
  { i: 0, short: "Dom", label: "Domingo" },
] as const;

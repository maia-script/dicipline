import { addDays, format, startOfDay } from "date-fns";
import { isInWeek, parseDay, todayIso } from "./dates";
import type { StudyBlock, Subject, Task } from "./types";

export function minutesOnDate(blocks: StudyBlock[], iso: string) {
  return blocks
    .filter((b) => b.date === iso)
    .reduce((sum, b) => sum + b.minutesDone, 0);
}

export function lastNDays(blocks: StudyBlock[], n: number) {
  const rows: { date: string; minutes: number; label: string }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = addDays(startOfDay(new Date()), -i);
    const date = format(d, "yyyy-MM-dd");
    rows.push({
      date,
      minutes: minutesOnDate(blocks, date),
      label: format(d, "dd/MM"),
    });
  }
  return rows;
}

export function weekMinutes(blocks: StudyBlock[], d = new Date()) {
  return blocks
    .filter((b) => isInWeek(b.date, d))
    .reduce((sum, b) => sum + b.minutesDone, 0);
}

export function todayMinutes(blocks: StudyBlock[]) {
  return minutesOnDate(blocks, todayIso());
}

export function streakDays(blocks: StudyBlock[]) {
  const withStudy = new Set(
    blocks.filter((b) => b.minutesDone > 0).map((b) => b.date),
  );
  let streak = 0;
  let cursor = startOfDay(new Date());
  if (!withStudy.has(format(cursor, "yyyy-MM-dd"))) {
    cursor = addDays(cursor, -1);
  }
  while (withStudy.has(format(cursor, "yyyy-MM-dd"))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function tasksCompletedOn(tasks: Task[], iso: string) {
  return tasks.filter((t) => t.completedAt && t.completedAt.slice(0, 10) === iso).length;
}

export function openTasksDueToday(tasks: Task[]) {
  const today = todayIso();
  return tasks.filter((t) => !t.done && t.dueDate === today);
}

export function subjectBreakdown(blocks: StudyBlock[], subjects: Subject[], d = new Date()) {
  const week = blocks.filter((b) => isInWeek(b.date, d));
  return subjects
    .map((s) => ({
      id: s.id,
      name: s.name,
      tone: s.tone,
      minutes: week.filter((b) => b.subjectId === s.id).reduce((sum, b) => sum + b.minutesDone, 0),
    }))
    .sort((a, b) => b.minutes - a.minutes);
}

export function completionRate(blocks: StudyBlock[]) {
  const week = blocks.filter((b) => isInWeek(b.date));
  if (week.length === 0) return 0;
  const done = week.filter((b) => b.done || b.minutesDone >= b.minutesGoal).length;
  return done / week.length;
}

export function overdueTasks(tasks: Task[]) {
  const today = todayIso();
  return tasks.filter((t) => !t.done && t.dueDate && t.dueDate < today);
}

export function upcomingDays(fromIso: string, n: number) {
  const start = parseDay(fromIso);
  return Array.from({ length: n }, (_, i) => format(addDays(start, i), "yyyy-MM-dd"));
}

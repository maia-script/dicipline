import { F as startOfDay, m as format, z as addDays } from "../_libs/date-fns.mjs";
import { c as isInWeek, f as todayIso } from "./store-C94gReo7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-Bd-3R7Pz.js
function minutesOnDate(blocks, iso) {
	return blocks.filter((b) => b.date === iso).reduce((sum, b) => sum + b.minutesDone, 0);
}
function lastNDays(blocks, n) {
	const rows = [];
	for (let i = n - 1; i >= 0; i--) {
		const d = addDays(startOfDay(/* @__PURE__ */ new Date()), -i);
		const date = format(d, "yyyy-MM-dd");
		rows.push({
			date,
			minutes: minutesOnDate(blocks, date),
			label: format(d, "dd/MM")
		});
	}
	return rows;
}
function weekMinutes(blocks, d = /* @__PURE__ */ new Date()) {
	return blocks.filter((b) => isInWeek(b.date, d)).reduce((sum, b) => sum + b.minutesDone, 0);
}
function todayMinutes(blocks) {
	return minutesOnDate(blocks, todayIso());
}
function streakDays(blocks) {
	const withStudy = new Set(blocks.filter((b) => b.minutesDone > 0).map((b) => b.date));
	let streak = 0;
	let cursor = startOfDay(/* @__PURE__ */ new Date());
	if (!withStudy.has(format(cursor, "yyyy-MM-dd"))) cursor = addDays(cursor, -1);
	while (withStudy.has(format(cursor, "yyyy-MM-dd"))) {
		streak += 1;
		cursor = addDays(cursor, -1);
	}
	return streak;
}
function openTasksDueToday(tasks) {
	const today = todayIso();
	return tasks.filter((t) => !t.done && t.dueDate === today);
}
function subjectBreakdown(blocks, subjects, d = /* @__PURE__ */ new Date()) {
	const week = blocks.filter((b) => isInWeek(b.date, d));
	return subjects.map((s) => ({
		id: s.id,
		name: s.name,
		tone: s.tone,
		minutes: week.filter((b) => b.subjectId === s.id).reduce((sum, b) => sum + b.minutesDone, 0)
	})).sort((a, b) => b.minutes - a.minutes);
}
function completionRate(blocks) {
	const week = blocks.filter((b) => isInWeek(b.date));
	if (week.length === 0) return 0;
	return week.filter((b) => b.done || b.minutesDone >= b.minutesGoal).length / week.length;
}
function overdueTasks(tasks) {
	const today = todayIso();
	return tasks.filter((t) => !t.done && t.dueDate && t.dueDate < today);
}
//#endregion
export { streakDays as a, weekMinutes as c, overdueTasks as i, lastNDays as n, subjectBreakdown as o, openTasksDueToday as r, todayMinutes as s, completionRate as t };

import "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as weekdayIndex, l as minutesUntil, r as cn, u as parseDateTime } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime, u as Slot } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-transparent shadow-[var(--shadow-border)] hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-foreground underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-12 rounded-lg px-6",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function dayItems(date, events, slots) {
	const weekday = weekdayIndex(date);
	const fromEvents = events.filter((e) => e.date === date).map((e) => ({
		id: e.id,
		title: e.title,
		time: e.time,
		kind: e.kind,
		source: "event",
		subjectId: e.subjectId,
		durationMin: e.durationMin,
		minutesAway: e.time ? minutesUntil(e.date, e.time) : void 0
	}));
	const occupied = new Set(fromEvents.map((e) => e.time).filter(Boolean));
	const fromSlots = slots.filter((s) => s.weekday === weekday && !occupied.has(s.start)).map((s) => ({
		id: s.id,
		title: s.title,
		time: s.start,
		end: s.end,
		kind: "horario",
		source: "slot",
		subjectId: s.subjectId,
		minutesAway: minutesUntil(date, s.start)
	}));
	return [...fromEvents, ...fromSlots].sort((a, b) => {
		if (!a.time && !b.time) return 0;
		if (!a.time) return 1;
		if (!b.time) return -1;
		return a.time.localeCompare(b.time);
	});
}
function soonestUpcoming(date, events, slots, withinMin = 180) {
	const now = Date.now();
	return dayItems(date, events, slots).filter((item) => {
		if (!item.time) return false;
		const delta = (parseDateTime(date, item.time).getTime() - now) / 6e4;
		return delta >= -5 && delta <= withinMin;
	}).sort((a, b) => (a.minutesAway ?? 0) - (b.minutesAway ?? 0))[0];
}
function subjectName(subjects, id) {
	if (!id) return void 0;
	return subjects.find((s) => s.id === id)?.name;
}
function subjectTone(subjects, id) {
	if (!id) return void 0;
	return subjects.find((s) => s.id === id)?.tone;
}
var KIND_LABEL = {
	aula: "Aula",
	estudo: "Estudo",
	prova: "Prova",
	entrega: "Entrega",
	outro: "Evento",
	horario: "Horário"
};
var TASK_KIND_LABEL = {
	tarefa: "Tarefa",
	trabalho: "Trabalho",
	prova: "Prova"
};
var PRIORITY_LABEL = {
	baixa: "Baixa",
	media: "Média",
	alta: "Alta"
};
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 outline-none placeholder:text-muted-foreground/80 disabled:pointer-events-none disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { PRIORITY_LABEL as a, dayItems as c, subjectTone as d, Label as i, soonestUpcoming as l, Input as n, TASK_KIND_LABEL as o, KIND_LABEL as r, buttonVariants as s, Button as t, subjectName as u };

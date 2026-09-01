import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { E as differenceInMinutes, F as startOfDay, L as startOfWeek, a as isTomorrow, i as isYesterday, l as parse, m as format, o as isToday, t as ptBR, y as endOfWeek, z as addDays } from "../_libs/date-fns.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-C94gReo7.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function toneDot(tone) {
	if (!tone) return "bg-muted-foreground/50";
	return `tone-dot-${tone}`;
}
function todayIso() {
	return format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
}
function isoOffset(days) {
	return format(addDays(/* @__PURE__ */ new Date(), days), "yyyy-MM-dd");
}
function parseDay(iso) {
	return parse(iso, "yyyy-MM-dd", /* @__PURE__ */ new Date());
}
function parseDateTime(date, time = "08:00") {
	return parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", /* @__PURE__ */ new Date());
}
function formatDayLong(iso) {
	const d = parseDay(iso);
	if (isToday(d)) return "Hoje";
	if (isTomorrow(d)) return "Amanhã";
	if (isYesterday(d)) return "Ontem";
	return format(d, "EEE, d MMM", { locale: ptBR });
}
function formatDayFull(iso) {
	const d = iso ? parseDay(iso) : /* @__PURE__ */ new Date();
	return format(d, "EEEE, d 'de' MMMM", { locale: ptBR });
}
function weekdayIndex(iso) {
	return parseDay(iso).getDay();
}
function weekBounds(d = /* @__PURE__ */ new Date()) {
	return {
		start: startOfWeek(d, { weekStartsOn: 1 }),
		end: endOfWeek(d, { weekStartsOn: 1 })
	};
}
function isInWeek(iso, d = /* @__PURE__ */ new Date()) {
	const day = startOfDay(parseDay(iso));
	const { start, end } = weekBounds(d);
	return day >= startOfDay(start) && day <= startOfDay(end);
}
function minutesUntil(date, time) {
	return differenceInMinutes(parseDateTime(date, time), /* @__PURE__ */ new Date());
}
function formatClock(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
var WEEKDAYS_MON = [
	{
		i: 1,
		short: "Seg",
		label: "Segunda"
	},
	{
		i: 2,
		short: "Ter",
		label: "Terça"
	},
	{
		i: 3,
		short: "Qua",
		label: "Quarta"
	},
	{
		i: 4,
		short: "Qui",
		label: "Quinta"
	},
	{
		i: 5,
		short: "Sex",
		label: "Sexta"
	},
	{
		i: 6,
		short: "Sáb",
		label: "Sábado"
	},
	{
		i: 0,
		short: "Dom",
		label: "Domingo"
	}
];
var emptyTimer = {
	blockId: null,
	running: false,
	startedAt: null,
	accumulatedMs: 0
};
function emptyData() {
	return {
		subjects: [],
		folders: [],
		tasks: [],
		events: [],
		attachments: [],
		studyBlocks: [],
		slots: [],
		goals: {
			dailyMinutes: 90,
			weeklyMinutes: 480
		},
		notifiedIds: [],
		timer: { ...emptyTimer },
		demoLoaded: false,
		clearedByUser: false
	};
}
function buildDemo() {
	const subjects = [
		{
			id: "sub-calculo",
			name: "Cálculo II",
			tone: "slate"
		},
		{
			id: "sub-fisica",
			name: "Física",
			tone: "taupe"
		},
		{
			id: "sub-lit",
			name: "Literatura",
			tone: "sage"
		},
		{
			id: "sub-en",
			name: "Inglês",
			tone: "clay"
		}
	];
	const folders = [
		{
			id: "fld-calc-listas",
			name: "Listas",
			subjectId: "sub-calculo"
		},
		{
			id: "fld-calc-provas",
			name: "Provas anteriores",
			subjectId: "sub-calculo"
		},
		{
			id: "fld-fis-resumos",
			name: "Resumos",
			subjectId: "sub-fisica"
		},
		{
			id: "fld-lit-ensaios",
			name: "Ensaios",
			subjectId: "sub-lit"
		},
		{
			id: "fld-en-vocab",
			name: "Vocabulário",
			subjectId: "sub-en"
		}
	];
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const today = todayIso();
	const tasks = [
		{
			id: "tsk-integrais",
			title: "Lista 4 — integrais por partes",
			notes: "Exercícios 1 a 12. Marcar dúvidas da 7 e da 10.",
			done: false,
			dueDate: today,
			subjectId: "sub-calculo",
			folderId: "fld-calc-listas",
			kind: "tarefa",
			priority: "alta",
			createdAt: now
		},
		{
			id: "tsk-newton",
			title: "Revisar leis de Newton",
			notes: "Foco em diagramas de corpo livre.",
			done: false,
			dueDate: isoOffset(1),
			subjectId: "sub-fisica",
			folderId: "fld-fis-resumos",
			kind: "tarefa",
			priority: "media",
			createdAt: now
		},
		{
			id: "tsk-ensaio",
			title: "Ensaio: Machado e o narrador",
			notes: "Rascunho de 800 palavras. Citar dois contos.",
			done: false,
			dueDate: isoOffset(3),
			subjectId: "sub-lit",
			folderId: "fld-lit-ensaios",
			kind: "trabalho",
			priority: "alta",
			createdAt: now
		},
		{
			id: "tsk-phrasal",
			title: "20 phrasal verbs — unidade 6",
			notes: "",
			done: false,
			dueDate: isoOffset(2),
			subjectId: "sub-en",
			folderId: "fld-en-vocab",
			kind: "tarefa",
			priority: "baixa",
			createdAt: now
		},
		{
			id: "tsk-prova-fis",
			title: "Prova de gravitação",
			notes: "Capítulos 8 e 9. Sem consulta.",
			done: false,
			dueDate: isoOffset(5),
			subjectId: "sub-fisica",
			kind: "prova",
			priority: "alta",
			createdAt: now
		},
		{
			id: "tsk-feita",
			title: "Ler capítulo 3 — Memórias Póstumas",
			notes: "",
			done: true,
			dueDate: isoOffset(-1),
			subjectId: "sub-lit",
			kind: "tarefa",
			priority: "media",
			createdAt: now,
			completedAt: (/* @__PURE__ */ new Date(Date.now() - 936e5)).toISOString()
		}
	];
	const events = [
		{
			id: "ev-aula-calc",
			title: "Aula de Cálculo — integrais",
			date: today,
			time: "19:00",
			durationMin: 120,
			notes: "Sala 204. Levar lista 4.",
			kind: "aula",
			remindMinutes: 30,
			subjectId: "sub-calculo"
		},
		{
			id: "ev-estudo-fis",
			title: "Bloco de revisão — Física",
			date: today,
			time: "16:30",
			durationMin: 60,
			notes: "",
			kind: "estudo",
			remindMinutes: 15,
			subjectId: "sub-fisica"
		},
		{
			id: "ev-entrega",
			title: "Entrega do ensaio",
			date: isoOffset(3),
			time: "23:59",
			durationMin: 15,
			notes: "PDF no portal da disciplina.",
			kind: "entrega",
			remindMinutes: 120,
			subjectId: "sub-lit"
		},
		{
			id: "ev-prova",
			title: "Prova de gravitação",
			date: isoOffset(5),
			time: "10:00",
			durationMin: 90,
			notes: "Levar documento e calculadora não-gráfica.",
			kind: "prova",
			remindMinutes: 60,
			subjectId: "sub-fisica"
		},
		{
			id: "ev-simulado",
			title: "Simulado de Cálculo",
			date: isoOffset(8),
			time: "09:00",
			durationMin: 180,
			notes: "",
			kind: "prova",
			remindMinutes: 60,
			subjectId: "sub-calculo"
		}
	];
	const slots = [
		{
			id: "sl-1",
			weekday: 1,
			start: "19:00",
			end: "21:00",
			title: "Cálculo — teoria",
			subjectId: "sub-calculo"
		},
		{
			id: "sl-2",
			weekday: 2,
			start: "18:00",
			end: "19:30",
			title: "Física — exercícios",
			subjectId: "sub-fisica"
		},
		{
			id: "sl-3",
			weekday: 3,
			start: "20:00",
			end: "21:00",
			title: "Inglês — listening",
			subjectId: "sub-en"
		},
		{
			id: "sl-4",
			weekday: 4,
			start: "19:00",
			end: "21:00",
			title: "Literatura — leitura",
			subjectId: "sub-lit"
		},
		{
			id: "sl-5",
			weekday: 5,
			start: "18:00",
			end: "19:00",
			title: "Revisão da semana",
			subjectId: "sub-calculo"
		},
		{
			id: "sl-6",
			weekday: 6,
			start: "10:00",
			end: "12:00",
			title: "Simulado / listas",
			subjectId: "sub-fisica"
		}
	];
	const contents = [
		"Integrais por partes",
		"Séries de Taylor — resumo",
		"Leis de Newton, DCL",
		"Gravitação: Kepler",
		"Contos de Machado",
		"Phrasal verbs unidade 5",
		"Limites laterais",
		"Energia potencial"
	];
	const studyBlocks = [{
		id: "blk-today-1",
		date: today,
		content: "Integrais por partes — lista 4",
		minutesGoal: 45,
		minutesDone: 12,
		subjectId: "sub-calculo",
		taskId: "tsk-integrais",
		folderId: "fld-calc-listas",
		done: false
	}, {
		id: "blk-today-2",
		date: today,
		content: "Resumo de gravitação, capítulos 8–9",
		minutesGoal: 40,
		minutesDone: 0,
		subjectId: "sub-fisica",
		folderId: "fld-fis-resumos",
		done: false
	}];
	for (let i = 1; i <= 16; i++) {
		if (i % 7 === 6) continue;
		const minutes = 35 + i * 11 % 50;
		const goal = 60;
		studyBlocks.push({
			id: `blk-past-${i}`,
			date: isoOffset(-i),
			content: contents[i % contents.length] ?? "Revisão",
			minutesGoal: goal,
			minutesDone: minutes,
			subjectId: subjects[i % subjects.length]?.id,
			done: minutes >= goal * .7
		});
	}
	return {
		subjects,
		folders,
		tasks,
		events,
		attachments: [],
		studyBlocks,
		slots,
		goals: {
			dailyMinutes: 90,
			weeklyMinutes: 480
		},
		notifiedIds: [],
		timer: { ...emptyTimer },
		demoLoaded: true,
		clearedByUser: false
	};
}
function persistable(s) {
	return {
		subjects: s.subjects,
		folders: s.folders,
		tasks: s.tasks,
		events: s.events,
		attachments: s.attachments,
		studyBlocks: s.studyBlocks,
		slots: s.slots,
		goals: s.goals,
		notifiedIds: s.notifiedIds,
		timer: s.timer.running ? s.timer : {
			...emptyTimer,
			blockId: s.timer.blockId,
			accumulatedMs: s.timer.accumulatedMs
		},
		demoLoaded: s.demoLoaded,
		clearedByUser: s.clearedByUser
	};
}
function flushTimer(s, clear = true) {
	const extra = s.timer.running && s.timer.startedAt ? Math.max(0, Date.now() - s.timer.startedAt) : 0;
	const total = s.timer.accumulatedMs + extra;
	const minutes = Math.round(total / 6e4);
	const studyBlocks = minutes > 0 && s.timer.blockId ? s.studyBlocks.map((b) => {
		if (b.id !== s.timer.blockId) return b;
		const minutesDone = b.minutesDone + minutes;
		return {
			...b,
			minutesDone,
			done: minutesDone >= b.minutesGoal ? true : b.done
		};
	}) : s.studyBlocks;
	return {
		...s,
		studyBlocks,
		timer: clear ? { ...emptyTimer } : {
			...s.timer,
			running: false,
			startedAt: null,
			accumulatedMs: total
		}
	};
}
function browserStorage() {
	if (typeof window === "undefined") return {
		getItem: () => null,
		setItem: () => {},
		removeItem: () => {}
	};
	return localStorage;
}
var useAppStore = create()(persist((set, get) => ({
	...emptyData(),
	hydrateFlag: 0,
	loadDemo: () => set({
		...buildDemo(),
		hydrateFlag: get().hydrateFlag + 1
	}),
	resetAll: () => set({
		...emptyData(),
		clearedByUser: true,
		demoLoaded: false,
		hydrateFlag: get().hydrateFlag + 1
	}),
	setGoals: (goals) => set({ goals }),
	addSubject: (name, tone) => {
		const id = uid();
		set((s) => ({ subjects: [...s.subjects, {
			id,
			name,
			tone
		}] }));
		return id;
	},
	updateSubject: (id, patch) => set((s) => ({ subjects: s.subjects.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeSubject: (id) => set((s) => ({
		subjects: s.subjects.filter((x) => x.id !== id),
		folders: s.folders.filter((x) => x.subjectId !== id),
		tasks: s.tasks.map((t) => t.subjectId === id ? {
			...t,
			subjectId: void 0
		} : t),
		events: s.events.map((e) => e.subjectId === id ? {
			...e,
			subjectId: void 0
		} : e),
		studyBlocks: s.studyBlocks.map((b) => b.subjectId === id ? {
			...b,
			subjectId: void 0
		} : b),
		slots: s.slots.map((sl) => sl.subjectId === id ? {
			...sl,
			subjectId: void 0
		} : sl)
	})),
	addFolder: (input) => {
		const id = uid();
		set((s) => ({ folders: [...s.folders, {
			...input,
			id
		}] }));
		return id;
	},
	updateFolder: (id, patch) => set((s) => ({ folders: s.folders.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeFolder: (id) => set((s) => ({
		folders: s.folders.filter((x) => x.id !== id && x.parentId !== id),
		tasks: s.tasks.map((t) => t.folderId === id ? {
			...t,
			folderId: void 0
		} : t),
		attachments: s.attachments.map((a) => a.folderId === id ? {
			...a,
			folderId: void 0
		} : a),
		studyBlocks: s.studyBlocks.map((b) => b.folderId === id ? {
			...b,
			folderId: void 0
		} : b)
	})),
	addTask: (input) => {
		const id = uid();
		set((s) => ({ tasks: [...s.tasks, {
			...input,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			done: false
		}] }));
		return id;
	},
	updateTask: (id, patch) => set((s) => ({ tasks: s.tasks.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	toggleTask: (id) => set((s) => ({ tasks: s.tasks.map((x) => {
		if (x.id !== id) return x;
		const done = !x.done;
		return {
			...x,
			done,
			completedAt: done ? (/* @__PURE__ */ new Date()).toISOString() : void 0
		};
	}) })),
	removeTask: (id) => set((s) => ({
		tasks: s.tasks.filter((x) => x.id !== id),
		studyBlocks: s.studyBlocks.map((b) => b.taskId === id ? {
			...b,
			taskId: void 0
		} : b),
		attachments: s.attachments.map((a) => a.taskId === id ? {
			...a,
			taskId: void 0
		} : a)
	})),
	addEvent: (input) => {
		const id = uid();
		set((s) => ({ events: [...s.events, {
			...input,
			id
		}] }));
		return id;
	},
	updateEvent: (id, patch) => set((s) => ({
		events: s.events.map((x) => x.id === id ? {
			...x,
			...patch
		} : x),
		notifiedIds: s.notifiedIds.filter((n) => n !== id)
	})),
	removeEvent: (id) => set((s) => ({
		events: s.events.filter((x) => x.id !== id),
		notifiedIds: s.notifiedIds.filter((n) => n !== id)
	})),
	markNotified: (id) => set((s) => ({ notifiedIds: s.notifiedIds.includes(id) ? s.notifiedIds : [...s.notifiedIds, id] })),
	addAttachment: (input) => {
		const id = input.id ?? uid();
		set((s) => ({ attachments: [...s.attachments, {
			id,
			name: input.name,
			mime: input.mime,
			size: input.size,
			folderId: input.folderId,
			taskId: input.taskId,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}] }));
		return id;
	},
	removeAttachment: (id) => set((s) => ({
		attachments: s.attachments.filter((x) => x.id !== id),
		studyBlocks: s.studyBlocks.map((b) => b.attachmentId === id ? {
			...b,
			attachmentId: void 0
		} : b)
	})),
	addStudyBlock: (input) => {
		const id = uid();
		set((s) => ({ studyBlocks: [...s.studyBlocks, {
			...input,
			id,
			minutesDone: input.minutesDone ?? 0,
			done: false
		}] }));
		return id;
	},
	updateStudyBlock: (id, patch) => set((s) => ({ studyBlocks: s.studyBlocks.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeStudyBlock: (id) => set((s) => ({
		studyBlocks: s.studyBlocks.filter((x) => x.id !== id),
		timer: s.timer.blockId === id ? { ...emptyTimer } : s.timer
	})),
	logMinutes: (blockId, minutes) => {
		if (minutes <= 0) return;
		set((s) => ({ studyBlocks: s.studyBlocks.map((b) => {
			if (b.id !== blockId) return b;
			const minutesDone = b.minutesDone + minutes;
			return {
				...b,
				minutesDone,
				done: minutesDone >= b.minutesGoal ? true : b.done
			};
		}) }));
	},
	addSlot: (input) => {
		const id = uid();
		set((s) => ({ slots: [...s.slots, {
			...input,
			id
		}] }));
		return id;
	},
	updateSlot: (id, patch) => set((s) => ({ slots: s.slots.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeSlot: (id) => set((s) => ({ slots: s.slots.filter((x) => x.id !== id) })),
	startTimer: (blockId) => set((s) => {
		let next = s;
		if (s.timer.running && s.timer.blockId && s.timer.blockId !== blockId) next = flushTimer(s, true);
		const same = next.timer.blockId === blockId;
		return {
			...next,
			timer: {
				blockId,
				running: true,
				startedAt: Date.now(),
				accumulatedMs: same ? next.timer.accumulatedMs : 0
			}
		};
	}),
	pauseTimer: () => set((s) => {
		const extra = s.timer.running && s.timer.startedAt ? Math.max(0, Date.now() - s.timer.startedAt) : 0;
		return { timer: {
			...s.timer,
			running: false,
			startedAt: null,
			accumulatedMs: s.timer.accumulatedMs + extra
		} };
	}),
	stopTimer: () => set((s) => flushTimer(s, true)),
	importData: (data) => set({
		...emptyData(),
		...data,
		hydrateFlag: get().hydrateFlag + 1
	})
}), {
	name: "dynamic-obsession-v1",
	storage: createJSONStorage(browserStorage),
	skipHydration: true,
	partialize: persistable,
	onRehydrateStorage: () => (state) => {
		if (!state) return;
		if (!state.demoLoaded && !state.clearedByUser) {
			const demo = buildDemo();
			useAppStore.setState({ ...demo });
		}
	}
}));
function assignToToday(input) {
	return useAppStore.getState().addStudyBlock({
		date: todayIso(),
		content: input.content,
		minutesGoal: input.minutesGoal ?? 40,
		subjectId: input.subjectId,
		taskId: input.taskId,
		attachmentId: input.attachmentId,
		folderId: input.folderId
	});
}
//#endregion
export { formatClock as a, isInWeek as c, parseDay as d, todayIso as f, weekdayIndex as g, useAppStore as h, formatBytes as i, minutesUntil as l, uid as m, assignToToday as n, formatDayFull as o, toneDot as p, cn as r, formatDayLong as s, WEEKDAYS_MON as t, parseDateTime as u };

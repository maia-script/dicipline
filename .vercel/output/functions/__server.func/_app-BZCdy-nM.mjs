import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { f as todayIso, h as useAppStore, l as minutesUntil, o as formatDayFull, r as cn } from "./_ssr/store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { c as dayItems, l as soonestUpcoming, r as KIND_LABEL, t as Button, u as subjectName } from "./_ssr/label-CCYUPZiH.mjs";
import { s as Plus } from "./_libs/lucide-react.mjs";
import { t as EventForm } from "./_ssr/event-form-CvmYhvOO.mjs";
import { t as PageHeader } from "./_ssr/tone-dot-B56sz6Mb.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./_ssr/card-BphI5S4Z.mjs";
import { n as StudyForm, t as StudyBlockCard } from "./_ssr/study-block-card-CrhBr3TV.mjs";
import { n as TaskRow, t as TaskForm } from "./_ssr/task-row-uJMGSKAt.mjs";
import { a as streakDays, c as weekMinutes, r as openTasksDueToday, s as todayMinutes } from "./_ssr/stats-Bd-3R7Pz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-BZCdy-nM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TodayPage() {
	const today = todayIso();
	const events = useAppStore((s) => s.events);
	const slots = useAppStore((s) => s.slots);
	const tasks = useAppStore((s) => s.tasks);
	const subjects = useAppStore((s) => s.subjects);
	const blocks = useAppStore((s) => s.studyBlocks);
	const goals = useAppStore((s) => s.goals);
	const [taskOpen, setTaskOpen] = (0, import_react.useState)(false);
	const [eventOpen, setEventOpen] = (0, import_react.useState)(false);
	const [studyOpen, setStudyOpen] = (0, import_react.useState)(false);
	const [editingTask, setEditingTask] = (0, import_react.useState)();
	const [editingBlock, setEditingBlock] = (0, import_react.useState)();
	const timeline = dayItems(today, events, slots);
	const todayBlocks = blocks.filter((b) => b.date === today);
	const todayTasks = openTasksDueToday(tasks);
	const otherOpen = tasks.filter((t) => !t.done && t.dueDate !== today).slice(0, 4);
	const mins = todayMinutes(blocks);
	const week = weekMinutes(blocks);
	const streak = streakDays(blocks);
	const soon = soonestUpcoming(today, events, slots, 180);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: formatDayFull(),
				title: "Hoje",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setEventOpen(true),
						children: "Evento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setTaskOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Tarefa"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Sequência",
						value: `${streak}`,
						hint: "dias"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Hoje",
						value: `${mins}`,
						hint: `de ${goals.dailyMinutes} min`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Semana",
						value: `${week}`,
						hint: `de ${goals.weeklyMinutes} min`
					})
				]
			}),
			soon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card px-5 py-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase",
						children: "Próximo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif text-2xl",
						children: soon.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							soon.time,
							soon.minutesAway !== void 0 && soon.minutesAway >= 0 ? ` · em ${soon.minutesAway} min` : " · agora",
							` · ${KIND_LABEL[soon.kind]}`
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Agenda do dia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setEventOpen(true),
						children: "Marcar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-sm text-muted-foreground",
					children: "Nada marcado neste dia."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "relative space-y-0 border-l border-border ml-2",
					children: timeline.map((item) => {
						const away = item.time ? minutesUntil(today, item.time) : void 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative py-3 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-5 -left-1.5 size-3 rounded-full", away !== void 0 && away <= 0 && away > -90 ? "bg-primary" : "bg-muted-foreground/40") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tabular-nums text-muted-foreground",
									children: [item.time ?? "—", item.end ? `–${item.end}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [KIND_LABEL[item.kind], subjectName(subjects, item.subjectId) ? ` · ${subjectName(subjects, item.subjectId)}` : ""]
								})
							]
						}, `${item.source}-${item.id}`);
					})
				}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Checklist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setTaskOpen(true),
						children: "Nova"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "-mx-2",
					children: todayTasks.length === 0 && otherOpen.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-6 text-sm text-muted-foreground",
						children: "Nenhuma tarefa em aberto."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [todayTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRow, {
							task: t,
							onEdit: (task) => {
								setEditingTask(task);
								setTaskOpen(true);
							}
						}, t.id)), otherOpen.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRow, {
							task: t,
							onEdit: (task) => {
								setEditingTask(task);
								setTaskOpen(true);
							}
						}, t.id))]
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl",
						children: "Estudo do dia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setStudyOpen(true),
						children: "Atribuir conteúdo"
					})]
				}), todayBlocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-card px-5 py-8 text-sm text-muted-foreground shadow-[var(--shadow-border)]",
					children: "Nada atribuído para hoje. Escolha um arquivo ou tarefa na aba Estudos."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: todayBlocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyBlockCard, {
						block: b,
						onEdit: (block) => {
							setEditingBlock(block);
							setStudyOpen(true);
						}
					}, b.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskForm, {
				open: taskOpen,
				onOpenChange: (v) => {
					setTaskOpen(v);
					if (!v) setEditingTask(void 0);
				},
				task: editingTask,
				defaults: { dueDate: today }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventForm, {
				open: eventOpen,
				onOpenChange: setEventOpen,
				defaults: { date: today }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyForm, {
				open: studyOpen,
				onOpenChange: (v) => {
					setStudyOpen(v);
					if (!v) setEditingBlock(void 0);
				},
				block: editingBlock,
				defaults: { date: today }
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card px-4 py-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-wide text-muted-foreground uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-serif text-2xl tabular-nums leading-none md:text-3xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { TodayPage as component };

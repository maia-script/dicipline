import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as todayIso, h as useAppStore, n as assignToToday, r as cn, s as formatDayLong } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as PRIORITY_LABEL, d as subjectTone, n as Input, o as TASK_KIND_LABEL, t as Button, u as subjectName } from "./label-CCYUPZiH.mjs";
import { m as Ellipsis, y as Check } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, c as DropdownMenuItem, d as Select, f as SelectContent, h as SelectValue, i as DialogHeader, l as DropdownMenuTrigger, m as SelectTrigger, n as DialogContent, o as DropdownMenu, p as SelectItem, r as DialogFooter, s as DropdownMenuContent, t as Dialog, u as Field } from "./dropdown-menu-BmpsJDat.mjs";
import { t as Textarea } from "./textarea-D25JbILz.mjs";
import { n as ToneDot } from "./tone-dot-B56sz6Mb.mjs";
import { t as Badge } from "./badge-aG3SbmQr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/task-row-uJMGSKAt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NONE = "__none";
function TaskForm({ open, onOpenChange, task, defaults }) {
	const subjects = useAppStore((s) => s.subjects);
	const addTask = useAppStore((s) => s.addTask);
	const updateTask = useAppStore((s) => s.updateTask);
	const [title, setTitle] = (0, import_react.useState)(task?.title ?? "");
	const [notes, setNotes] = (0, import_react.useState)(task?.notes ?? "");
	const [dueDate, setDueDate] = (0, import_react.useState)(task?.dueDate ?? defaults?.dueDate ?? todayIso());
	const [kind, setKind] = (0, import_react.useState)(task?.kind ?? defaults?.kind ?? "tarefa");
	const [priority, setPriority] = (0, import_react.useState)(task?.priority ?? "media");
	const [subjectId, setSubjectId] = (0, import_react.useState)(task?.subjectId ?? defaults?.subjectId ?? NONE);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle(task?.title ?? "");
		setNotes(task?.notes ?? "");
		setDueDate(task?.dueDate ?? defaults?.dueDate ?? todayIso());
		setKind(task?.kind ?? defaults?.kind ?? "tarefa");
		setPriority(task?.priority ?? "media");
		setSubjectId(task?.subjectId ?? defaults?.subjectId ?? NONE);
	}, [
		open,
		task,
		defaults?.dueDate,
		defaults?.kind,
		defaults?.subjectId
	]);
	function save() {
		const payload = {
			title: title.trim() || "Sem título",
			notes,
			dueDate: dueDate || void 0,
			kind,
			priority,
			subjectId: subjectId === NONE ? void 0 : subjectId,
			folderId: task?.folderId ?? defaults?.folderId
		};
		if (task) updateTask(task.id, payload);
		else addTask(payload);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: task ? "Editar tarefa" : "Nova tarefa" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Título",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tipo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: kind,
								onValueChange: (v) => setKind(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "tarefa",
										children: "Tarefa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "trabalho",
										children: "Trabalho"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "prova",
										children: "Prova"
									})
								] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Prioridade",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: priority,
								onValueChange: (v) => setPriority(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "baixa",
										children: "Baixa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "media",
										children: "Média"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "alta",
										children: "Alta"
									})
								] })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Prazo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: dueDate,
								onChange: (e) => setDueDate(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Matéria",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: subjectId,
								onValueChange: setSubjectId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Nenhuma" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: NONE,
									children: "Nenhuma"
								}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s.id,
									children: s.name
								}, s.id))] })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notas",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							rows: 3
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => onOpenChange(false),
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				children: "Salvar"
			})] })
		] })
	});
}
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer relative size-5 shrink-0 rounded-sm border border-border shadow-[var(--shadow-border)] outline-none after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 focus-visible:ring-2 focus-visible:ring-ring/60 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				strokeWidth: 2.5
			})
		})
	});
}
function TaskRow({ task, onEdit }) {
	const subjects = useAppStore((s) => s.subjects);
	const toggleTask = useAppStore((s) => s.toggleTask);
	const removeTask = useAppStore((s) => s.removeTask);
	const name = subjectName(subjects, task.subjectId);
	const tone = subjectTone(subjects, task.subjectId);
	const overdue = Boolean(task.dueDate && !task.done && task.dueDate < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-accent/60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: task.done,
				onCheckedChange: () => toggleTask(task.id),
				className: "mt-0.5",
				"aria-label": task.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm leading-snug", task.done && "text-muted-foreground line-through"),
					children: task.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						name ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneDot, { tone }), name]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: TASK_KIND_LABEL[task.kind]
						}),
						task.priority === "alta" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "danger",
							children: PRIORITY_LABEL[task.priority]
						}) : null,
						task.dueDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: overdue ? "text-destructive" : "",
							children: formatDayLong(task.dueDate)
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Ações",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onClick: () => onEdit(task),
						children: "Editar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onClick: () => assignToToday({
							content: task.title,
							subjectId: task.subjectId,
							taskId: task.id,
							folderId: task.folderId
						}),
						children: "Estudar hoje"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						variant: "destructive",
						onClick: () => removeTask(task.id),
						children: "Excluir"
					})
				]
			})] })
		]
	});
}
//#endregion
export { TaskRow as n, TaskForm as t };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as todayIso, h as useAppStore, r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { d as subjectTone, n as Input, t as Button, u as subjectName } from "./label-CCYUPZiH.mjs";
import { c as Play, m as Ellipsis } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, c as DropdownMenuItem, d as Select, f as SelectContent, h as SelectValue, i as DialogHeader, l as DropdownMenuTrigger, m as SelectTrigger, n as DialogContent, o as DropdownMenu, p as SelectItem, r as DialogFooter, s as DropdownMenuContent, t as Dialog, u as Field } from "./dropdown-menu-BmpsJDat.mjs";
import { n as ToneDot } from "./tone-dot-B56sz6Mb.mjs";
import { t as Progress } from "./progress-CjUt5Z7H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-block-card-CrhBr3TV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NONE = "__none";
function StudyForm({ open, onOpenChange, block, defaults }) {
	const subjects = useAppStore((s) => s.subjects);
	const addStudyBlock = useAppStore((s) => s.addStudyBlock);
	const updateStudyBlock = useAppStore((s) => s.updateStudyBlock);
	const [content, setContent] = (0, import_react.useState)(block?.content ?? defaults?.content ?? "");
	const [date, setDate] = (0, import_react.useState)(block?.date ?? defaults?.date ?? todayIso());
	const [minutesGoal, setMinutesGoal] = (0, import_react.useState)(String(block?.minutesGoal ?? 40));
	const [subjectId, setSubjectId] = (0, import_react.useState)(block?.subjectId ?? defaults?.subjectId ?? NONE);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setContent(block?.content ?? defaults?.content ?? "");
		setDate(block?.date ?? defaults?.date ?? todayIso());
		setMinutesGoal(String(block?.minutesGoal ?? 40));
		setSubjectId(block?.subjectId ?? defaults?.subjectId ?? NONE);
	}, [
		open,
		block,
		defaults?.content,
		defaults?.date,
		defaults?.subjectId
	]);
	function save() {
		const payload = {
			content: content.trim() || "Estudo",
			date,
			minutesGoal: Number(minutesGoal) || 40,
			subjectId: subjectId === NONE ? void 0 : subjectId,
			folderId: block?.folderId ?? defaults?.folderId,
			taskId: block?.taskId ?? defaults?.taskId
		};
		if (block) updateStudyBlock(block.id, payload);
		else addStudyBlock(payload);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: block ? "Editar estudo" : "Estudar hoje" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "O que estudar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: content,
							onChange: (e) => setContent(e.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Data",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Meta (min)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 10,
								value: minutesGoal,
								onChange: (e) => setMinutesGoal(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Matéria",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: subjectId,
							onValueChange: setSubjectId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: NONE,
								children: "Nenhuma"
							}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s.id,
								children: s.name
							}, s.id))] })]
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
function StudyBlockCard({ block, onEdit }) {
	const subjects = useAppStore((s) => s.subjects);
	const startTimer = useAppStore((s) => s.startTimer);
	const updateStudyBlock = useAppStore((s) => s.updateStudyBlock);
	const removeStudyBlock = useAppStore((s) => s.removeStudyBlock);
	const pct = block.minutesGoal <= 0 ? 0 : Math.min(100, block.minutesDone / block.minutesGoal * 100);
	const name = subjectName(subjects, block.subjectId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary/60 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-medium leading-snug", block.done && "text-muted-foreground"),
						children: block.content
					}), name ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneDot, { tone: subjectTone(subjects, block.subjectId) }), name]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
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
						onEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => onEdit(block),
							children: "Editar"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => updateStudyBlock(block.id, { done: !block.done }),
							children: block.done ? "Reabrir" : "Concluir"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							variant: "destructive",
							onClick: () => removeStudyBlock(block.id),
							children: "Remover"
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: pct,
					className: "flex-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-muted-foreground",
					children: [
						block.minutesDone,
						"/",
						block.minutesGoal,
						" min"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				className: "mt-3",
				onClick: () => startTimer(block.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), "Foco"]
			})
		]
	});
}
//#endregion
export { StudyForm as n, StudyBlockCard as t };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as todayIso, h as useAppStore } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as Input, t as Button } from "./label-CCYUPZiH.mjs";
import { a as DialogTitle, d as Select, f as SelectContent, h as SelectValue, i as DialogHeader, m as SelectTrigger, n as DialogContent, p as SelectItem, r as DialogFooter, t as Dialog, u as Field } from "./dropdown-menu-BmpsJDat.mjs";
import { t as Textarea } from "./textarea-D25JbILz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/event-form-CvmYhvOO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NONE = "__none";
function EventForm({ open, onOpenChange, event, defaults }) {
	const subjects = useAppStore((s) => s.subjects);
	const addEvent = useAppStore((s) => s.addEvent);
	const updateEvent = useAppStore((s) => s.updateEvent);
	const [title, setTitle] = (0, import_react.useState)(event?.title ?? "");
	const [date, setDate] = (0, import_react.useState)(event?.date ?? defaults?.date ?? todayIso());
	const [time, setTime] = (0, import_react.useState)(event?.time ?? "19:00");
	const [durationMin, setDurationMin] = (0, import_react.useState)(String(event?.durationMin ?? 60));
	const [kind, setKind] = (0, import_react.useState)(event?.kind ?? "estudo");
	const [remindMinutes, setRemindMinutes] = (0, import_react.useState)(String(event?.remindMinutes ?? 30));
	const [subjectId, setSubjectId] = (0, import_react.useState)(event?.subjectId ?? defaults?.subjectId ?? NONE);
	const [notes, setNotes] = (0, import_react.useState)(event?.notes ?? "");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle(event?.title ?? "");
		setDate(event?.date ?? defaults?.date ?? todayIso());
		setTime(event?.time ?? "19:00");
		setDurationMin(String(event?.durationMin ?? 60));
		setKind(event?.kind ?? "estudo");
		setRemindMinutes(String(event?.remindMinutes ?? 30));
		setSubjectId(event?.subjectId ?? defaults?.subjectId ?? NONE);
		setNotes(event?.notes ?? "");
	}, [
		open,
		event,
		defaults?.date,
		defaults?.subjectId
	]);
	function save() {
		const payload = {
			title: title.trim() || "Sem título",
			date,
			time: time || void 0,
			durationMin: Number(durationMin) || 60,
			kind,
			remindMinutes: Number(remindMinutes) || 30,
			subjectId: subjectId === NONE ? void 0 : subjectId,
			notes
		};
		if (event) updateEvent(event.id, payload);
		else addEvent(payload);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: event ? "Editar evento" : "Novo evento" }) }),
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
							label: "Data",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Horário",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "time",
								value: time,
								onChange: (e) => setTime(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Duração (min)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 5,
								value: durationMin,
								onChange: (e) => setDurationMin(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Aviso",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: remindMinutes,
								onValueChange: setRemindMinutes,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "10",
										children: "10 minutos antes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "30",
										children: "30 minutos antes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "60",
										children: "1 hora antes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "120",
										children: "2 horas antes"
									})
								] })]
							})
						})]
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
										value: "aula",
										children: "Aula"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "estudo",
										children: "Estudo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "prova",
										children: "Prova"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "entrega",
										children: "Entrega"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "outro",
										children: "Outro"
									})
								] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
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
//#endregion
export { EventForm as t };

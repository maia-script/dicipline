import { i as __toESM } from "../_runtime.mjs";
import { m as format } from "../_libs/date-fns.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as parseDay, h as useAppStore, o as formatDayFull, r as cn, s as formatDayLong, t as WEEKDAYS_MON } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { c as dayItems, d as subjectTone, n as Input, r as KIND_LABEL, s as buttonVariants, t as Button, u as subjectName } from "./label-CCYUPZiH.mjs";
import { _ as ChevronLeft, g as ChevronRight, m as Ellipsis, s as Plus } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, c as DropdownMenuItem, d as Select, f as SelectContent, h as SelectValue, i as DialogHeader, l as DropdownMenuTrigger, m as SelectTrigger, n as DialogContent, o as DropdownMenu, p as SelectItem, r as DialogFooter, s as DropdownMenuContent, t as Dialog, u as Field } from "./dropdown-menu-BmpsJDat.mjs";
import { t as EventForm } from "./event-form-CvmYhvOO.mjs";
import { n as ToneDot, t as PageHeader } from "./tone-dot-B56sz6Mb.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BphI5S4Z.mjs";
import { n as DayPicker, t as ptBR } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agenda-r5HcdUoZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		locale: ptBR,
		showOutsideDays,
		weekStartsOn: 1,
		className: cn("p-1", className),
		classNames: {
			months: "flex flex-col",
			month: "flex flex-col gap-3",
			month_caption: "flex items-center justify-center relative h-10",
			caption_label: "text-sm font-medium capitalize",
			nav: "flex items-center",
			button_previous: cn(buttonVariants({
				variant: "ghost",
				size: "icon-sm"
			}), "absolute left-1"),
			button_next: cn(buttonVariants({
				variant: "ghost",
				size: "icon-sm"
			}), "absolute right-1"),
			month_grid: "w-full border-collapse",
			weekdays: "flex",
			weekday: "w-9 text-center text-xs font-medium text-muted-foreground",
			week: "flex mt-1",
			day: "relative p-0 text-center text-sm",
			day_button: cn(buttonVariants({
				variant: "ghost",
				size: "icon-sm"
			}), "size-9 p-0 font-normal aria-selected:opacity-100"),
			selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
			today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
			outside: "text-muted-foreground/50",
			disabled: "text-muted-foreground opacity-40",
			hidden: "invisible",
			...classNames
		},
		components: { Chevron: ({ orientation }) => orientation === "left" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }) },
		...props
	});
}
var NONE = "__none";
function AgendaPage() {
	const events = useAppStore((s) => s.events);
	const slots = useAppStore((s) => s.slots);
	const subjects = useAppStore((s) => s.subjects);
	const removeEvent = useAppStore((s) => s.removeEvent);
	const addSlot = useAppStore((s) => s.addSlot);
	const removeSlot = useAppStore((s) => s.removeSlot);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [eventOpen, setEventOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)();
	const [slotOpen, setSlotOpen] = (0, import_react.useState)(false);
	const iso = format(selected, "yyyy-MM-dd");
	const items = dayItems(iso, events, slots);
	const daysWithEvents = (0, import_react.useMemo)(() => events.map((e) => parseDay(e.date)), [events]);
	const upcoming = [...events].filter((e) => e.date >= format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")).sort((a, b) => `${a.date}${a.time ?? ""}`.localeCompare(`${b.date}${b.time ?? ""}`)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Calendário",
				title: "Agenda",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setEventOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Evento"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[auto_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "w-full lg:w-fit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "pt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							mode: "single",
							selected,
							onSelect: (d) => d && setSelected(d),
							modifiers: { marked: daysWithEvents },
							modifiersClassNames: { marked: "[&>button]:underline [&>button]:underline-offset-4" }
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "capitalize",
					children: formatDayFull(iso)
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-sm text-muted-foreground",
						children: "Nenhum compromisso neste dia."
					}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 rounded-xl bg-secondary/50 px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tabular-nums text-muted-foreground",
								children: [item.time ?? "Dia inteiro", item.end ? `–${item.end}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneDot, { tone: subjectTone(subjects, item.subjectId) }),
									KIND_LABEL[item.kind],
									subjectName(subjects, item.subjectId) ? ` · ${subjectName(subjects, item.subjectId)}` : ""
								]
							})
						] }), item.source === "event" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon-sm",
								variant: "ghost",
								"aria-label": "Ações",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onClick: () => {
									const ev = events.find((e) => e.id === item.id);
									if (ev) {
										setEditing(ev);
										setEventOpen(true);
									}
								},
								children: "Editar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								variant: "destructive",
								onClick: () => removeEvent(item.id),
								children: "Excluir"
							})]
						})] }) : null]
					}, `${item.source}-${item.id}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full",
						onClick: () => setEventOpen(true),
						children: "Adicionar neste dia"
					})]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "À frente" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-2",
					children: upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Nenhum evento futuro."
					}) : upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-baseline justify-between gap-3 rounded-lg px-2 py-2 text-left hover:bg-accent",
						onClick: () => setSelected(parseDay(e.date)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm",
							children: e.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 text-xs text-muted-foreground",
							children: [formatDayLong(e.date), e.time ? ` · ${e.time}` : ""]
						})]
					}, e.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Horário semanal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setSlotOpen(true),
						children: "Faixa"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: WEEKDAYS_MON.map((day) => {
						const daySlots = slots.filter((s) => s.weekday === day.i).sort((a, b) => a.start.localeCompare(b.start));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: day.label
						}), daySlots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-1 text-sm text-muted-foreground/70",
							children: "—"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 space-y-1",
							children: daySlots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-muted-foreground",
										children: [
											s.start,
											"–",
											s.end
										]
									}),
									" ",
									s.title
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-muted-foreground hover:text-destructive",
									onClick: () => removeSlot(s.id),
									children: "tirar"
								})]
							}, s.id))
						})] }, day.i);
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventForm, {
				open: eventOpen,
				onOpenChange: (v) => {
					setEventOpen(v);
					if (!v) setEditing(void 0);
				},
				event: editing,
				defaults: { date: iso }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotDialog, {
				open: slotOpen,
				onOpenChange: setSlotOpen,
				onSave: (slot) => {
					addSlot(slot);
					setSlotOpen(false);
				}
			})
		]
	});
}
function SlotDialog({ open, onOpenChange, onSave }) {
	const subjects = useAppStore((s) => s.subjects);
	const [weekday, setWeekday] = (0, import_react.useState)("1");
	const [start, setStart] = (0, import_react.useState)("19:00");
	const [end, setEnd] = (0, import_react.useState)("21:00");
	const [title, setTitle] = (0, import_react.useState)("");
	const [subjectId, setSubjectId] = (0, import_react.useState)(NONE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Faixa de horário" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Título",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Dia",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: weekday,
							onValueChange: setWeekday,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: WEEKDAYS_MON.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(d.i),
								children: d.label
							}, d.i)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Início",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "time",
								value: start,
								onChange: (e) => setStart(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Fim",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "time",
								value: end,
								onChange: (e) => setEnd(e.target.value)
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
				onClick: () => onSave({
					weekday: Number(weekday),
					start,
					end,
					title: title.trim() || "Estudo",
					subjectId: subjectId === NONE ? void 0 : subjectId
				}),
				children: "Salvar"
			})] })
		] })
	});
}
//#endregion
export { AgendaPage as component };

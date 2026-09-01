import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { a as formatClock, h as useAppStore, r as cn, s as formatDayLong, u as parseDateTime } from "./_ssr/store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as Label, n as Input, r as KIND_LABEL, t as Button } from "./_ssr/label-CCYUPZiH.mjs";
import { d as useRouterState, m as Outlet, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as Bell, S as BookOpen, a as Square, b as ChartNoAxesCombined, c as Play, d as ListChecks, i as SunMedium, l as Pause, o as Settings, t as X, x as CalendarDays } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "./_libs/radix-ui__react-switch.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "./_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-B6yLZvZ7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("relative inline-flex size-8 items-center justify-center", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border border-foreground/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1.5 rounded-full border border-foreground/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" })
		]
	});
}
function BrandWordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase",
				children: "Dynamic"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-serif italic tracking-tight", compact ? "text-lg" : "text-xl"),
				children: "Obsession"
			})]
		})]
	});
}
var ITEMS = [
	{
		to: "/",
		label: "Hoje",
		icon: SunMedium
	},
	{
		to: "/agenda",
		label: "Agenda",
		icon: CalendarDays
	},
	{
		to: "/tarefas",
		label: "Tarefas",
		icon: ListChecks
	},
	{
		to: "/estudos",
		label: "Estudos",
		icon: BookOpen
	},
	{
		to: "/progresso",
		label: "Progresso",
		icon: ChartNoAxesCombined
	}
];
function SideNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		"aria-label": "Principal",
		children: ITEMS.map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					strokeWidth: 1.75
				}), item.label]
			}, item.to);
		})
	});
}
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
		"aria-label": "Principal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-5",
			children: ITEMS.map((item) => {
				const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex h-14 flex-col items-center justify-center gap-1 text-[10px] tracking-wide", active ? "text-foreground" : "text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2 : 1.6
					}), item.label]
				}) }, item.to);
			})
		})
	});
}
function useNow(intervalMs = 1e3) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);
	return now;
}
function FocusBar() {
	const timer = useAppStore((s) => s.timer);
	const blocks = useAppStore((s) => s.studyBlocks);
	const pauseTimer = useAppStore((s) => s.pauseTimer);
	const startTimer = useAppStore((s) => s.startTimer);
	const stopTimer = useAppStore((s) => s.stopTimer);
	const now = useNow(1e3);
	if (!timer.blockId) return null;
	const block = blocks.find((b) => b.id === timer.blockId);
	if (!block) return null;
	const ms = timer.running && timer.startedAt ? timer.accumulatedMs + Math.max(0, now - timer.startedAt) : timer.accumulatedMs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-3 z-40 rounded-xl border border-border bg-popover/95 px-3 py-2.5 shadow-[var(--shadow-border-hover)] backdrop-blur-sm bottom-[4.75rem] md:inset-x-auto md:right-6 md:bottom-6 md:w-[22rem]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: block.content
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 font-serif text-lg tabular-nums leading-none",
					children: [formatClock(ms), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 text-xs text-muted-foreground",
						children: [
							"meta ",
							block.minutesGoal,
							" min"
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [timer.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "secondary",
					onClick: pauseTimer,
					"aria-label": "Pausar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "secondary",
					onClick: () => startTimer(block.id),
					"aria-label": "Retomar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "ghost",
					onClick: stopTimer,
					"aria-label": "Encerrar e salvar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" })
				})]
			})]
		})
	});
}
function ReminderTicker() {
	const events = useAppStore((s) => s.events);
	const notifiedIds = useAppStore((s) => s.notifiedIds);
	const markNotified = useAppStore((s) => s.markNotified);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const now = Date.now();
			for (const ev of events) {
				if (notifiedIds.includes(ev.id)) continue;
				const start = parseDateTime(ev.date, ev.time).getTime();
				if (now >= start - ev.remindMinutes * 6e4 && now <= start + 3e5) {
					const when = ev.time ? `às ${ev.time}` : "hoje";
					toast(ev.title, {
						description: `${KIND_LABEL[ev.kind]} ${when}`,
						duration: 8e3
					});
					if (typeof Notification !== "undefined" && Notification.permission === "granted") try {
						new Notification("Dynamic Obsession", {
							body: `${ev.title} ${when}`,
							tag: ev.id
						});
					} catch {}
					markNotified(ev.id);
				}
			}
		};
		tick();
		const id = window.setInterval(tick, 2e4);
		return () => window.clearInterval(id);
	}, [
		events,
		notifiedIds,
		markNotified
	]);
	return null;
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent shadow-[var(--shadow-border)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5") })
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col gap-4 bg-popover p-5 text-popover-foreground shadow-[var(--shadow-border-hover)] transition duration-300 ease-[var(--ease-out-smooth)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "left" && "inset-y-0 left-0 h-full w-full max-w-md border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", side === "bottom" && "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-2xl border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-md p-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Fechar"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 pr-8", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-serif text-xl font-medium", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function SettingsSheet({ open, onOpenChange }) {
	const goals = useAppStore((s) => s.goals);
	const setGoals = useAppStore((s) => s.setGoals);
	const loadDemo = useAppStore((s) => s.loadDemo);
	const resetAll = useAppStore((s) => s.resetAll);
	const importData = useAppStore((s) => s.importData);
	const fileRef = (0, import_react.useRef)(null);
	const [notifyOn, setNotifyOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setNotifyOn(typeof Notification !== "undefined" && Notification.permission === "granted");
	}, []);
	async function enableNotify(next) {
		if (!next) {
			setNotifyOn(false);
			return;
		}
		if (typeof Notification === "undefined") {
			toast.error("Este navegador não suporta avisos.");
			return;
		}
		const perm = await Notification.requestPermission();
		setNotifyOn(perm === "granted");
		if (perm === "granted") toast.success("Avisos ativados para eventos próximos.");
		else toast.message("Permissão de aviso recusada.");
	}
	function exportJson() {
		const s = useAppStore.getState();
		const data = {
			subjects: s.subjects,
			folders: s.folders,
			tasks: s.tasks,
			events: s.events,
			attachments: s.attachments,
			studyBlocks: s.studyBlocks,
			slots: s.slots,
			goals: s.goals,
			notifiedIds: [],
			timer: s.timer,
			demoLoaded: s.demoLoaded,
			clearedByUser: s.clearedByUser
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "dynamic-obsession.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	async function onImport(file) {
		if (!file) return;
		try {
			const parsed = JSON.parse(await file.text());
			if (!Array.isArray(parsed.tasks) || !Array.isArray(parsed.events)) throw new Error("arquivo inválido");
			importData(parsed);
			toast.success("Dados importados.");
		} catch {
			toast.error("Não foi possível ler esse arquivo.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Ajustes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Metas, avisos e dados desta agenda." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Metas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "daily",
									children: "Minutos / dia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "daily",
									type: "number",
									min: 15,
									max: 720,
									value: goals.dailyMinutes,
									onChange: (e) => setGoals({
										...goals,
										dailyMinutes: Number(e.target.value) || 0
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "weekly",
									children: "Minutos / semana"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "weekly",
									type: "number",
									min: 30,
									max: 4e3,
									value: goals.weeklyMinutes,
									onChange: (e) => setGoals({
										...goals,
										weeklyMinutes: Number(e.target.value) || 0
									})
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Avisos de eventos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Notificação do sistema quando um compromisso estiver perto."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: notifyOn,
							onCheckedChange: (v) => void enableNotify(v)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium",
								children: "Dados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Tudo fica neste aparelho. Arquivos anexados não entram no JSON."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: exportJson,
										children: "Exportar JSON"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => fileRef.current?.click(),
										children: "Importar JSON"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "application/json",
										className: "hidden",
										onChange: (e) => void onImport(e.target.files?.[0])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => {
											loadDemo();
											toast.message("Exemplo carregado.");
										},
										children: "Carregar exemplo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "destructive",
										onClick: () => {
											resetAll();
											toast.message("Agenda zerada.");
										},
										children: "Começar do zero"
									})
								]
							})
						]
					})
				]
			})]
		})
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
function PopoverContent({ className, align = "center", sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		align,
		sideOffset,
		className: cn("z-50 w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-border-hover)] outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-secondary", className),
		...props
	});
}
var rehydrateStarted = false;
function useStoreReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const persist = useAppStore.persist;
		if (!persist) {
			setReady(true);
			return;
		}
		const finish = () => setReady(true);
		const unsub = persist.onFinishHydration(finish);
		if (!rehydrateStarted) {
			rehydrateStarted = true;
			persist.rehydrate();
		}
		if (persist.hasHydrated()) finish();
		return unsub;
	}, []);
	return ready;
}
function AppShell({ children }) {
	const ready = useStoreReady();
	const [settings, setSettings] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-background/80 px-4 py-6 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandWordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingBell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "flex-1 justify-start",
							onClick: () => setSettings(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), "Ajustes"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandWordmark, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingBell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: () => setSettings(true),
						"aria-label": "Ajustes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-5xl px-4 py-6 pb-28 md:ml-60 md:px-8 md:py-8 md:pb-12",
				children: ready ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootSkeleton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {}),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusBar, {}) : null,
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReminderTicker, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {
				open: settings,
				onOpenChange: setSettings
			})
		]
	});
}
function UpcomingBell() {
	const upcoming = [...useAppStore((s) => s.events)].filter((e) => e.date >= (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).sort((a, b) => `${a.date}${a.time ?? ""}`.localeCompare(`${b.date}${b.time ?? ""}`)).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "icon",
			variant: "ghost",
			"aria-label": "Próximos eventos",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-80",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Próximos avisos"
			}),
			upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Nenhum evento à frente."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: e.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-xs text-muted-foreground",
						children: [formatDayLong(e.date), e.time ? ` · ${e.time}` : ""]
					})]
				}, e.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: upcoming[0] ? KIND_LABEL[upcoming[0].kind] : "Agenda vazia"
			})
		]
	})] });
}
function BootSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-2xl" })
		]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };

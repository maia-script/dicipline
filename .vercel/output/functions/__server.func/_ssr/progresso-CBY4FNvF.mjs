import { h as useAppStore, r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as ToneDot, t as PageHeader } from "./tone-dot-B56sz6Mb.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BphI5S4Z.mjs";
import { t as Progress } from "./progress-CjUt5Z7H.mjs";
import { a as streakDays, c as weekMinutes, n as lastNDays, o as subjectBreakdown, s as todayMinutes, t as completionRate } from "./stats-Bd-3R7Pz.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progresso-CBY4FNvF.js
var import_jsx_runtime = require_jsx_runtime();
function GoalRing({ value, max, label, unit = "min", className }) {
	const r = 38;
	const c = 2 * Math.PI * r;
	const pct = max <= 0 ? 0 : Math.min(1, value / max);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative size-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 100 100",
				className: "size-full -rotate-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					className: "stroke-secondary",
					strokeWidth: "7"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					className: "stroke-primary",
					strokeWidth: "7",
					strokeLinecap: "round",
					strokeDasharray: c,
					strokeDashoffset: c * (1 - pct)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-2xl tabular-nums leading-none",
					children: Math.round(value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 text-[10px] tracking-wide text-muted-foreground uppercase",
					children: [
						"/ ",
						max,
						" ",
						unit
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		})]
	});
}
function ProgressPage() {
	const blocks = useAppStore((s) => s.studyBlocks);
	const tasks = useAppStore((s) => s.tasks);
	const subjects = useAppStore((s) => s.subjects);
	const goals = useAppStore((s) => s.goals);
	const series = lastNDays(blocks, 14);
	const today = todayMinutes(blocks);
	const week = weekMinutes(blocks);
	const streak = streakDays(blocks);
	const rate = completionRate(blocks);
	const bySubject = subjectBreakdown(blocks, subjects);
	const doneWeek = tasks.filter((t) => t.done && t.completedAt).length;
	const maxSubject = Math.max(1, ...bySubject.map((s) => s.minutes));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Infográfico",
				title: "Progresso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "items-center py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalRing, {
							value: today,
							max: goals.dailyMinutes,
							label: "Meta do dia"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "items-center py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalRing, {
							value: week,
							max: goals.weeklyMinutes,
							label: "Meta da semana"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Disciplina" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Sequência",
								value: `${streak} dias`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Blocos cumpridos",
								value: `${Math.round(rate * 100)}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Tarefas feitas",
								value: `${doneWeek}`
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Minutos estudados — 14 dias" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: series,
						margin: {
							top: 8,
							right: 8,
							left: -18,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: {
									fill: "var(--color-muted-foreground)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted-foreground)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								allowDecimals: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-secondary)" },
								contentStyle: {
									background: "var(--color-popover)",
									border: "1px solid var(--color-border)",
									borderRadius: 12,
									color: "var(--color-foreground)"
								},
								formatter: (value) => [`${value} min`, "Estudo"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "minutes",
								fill: "var(--color-chart-1)",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Por matéria nesta semana" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-4",
				children: bySubject.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ainda sem minutos registrados."
				}) : bySubject.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneDot, { tone: s.tone }), s.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted-foreground",
							children: [s.minutes, " min"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: s.minutes / maxSubject * 100 })]
				}, s.id))
			})] })
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-xl tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { ProgressPage as component };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as todayIso, h as useAppStore, r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./label-CCYUPZiH.mjs";
import { d as ListChecks, s as Plus } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./tone-dot-B56sz6Mb.mjs";
import { n as TaskRow, t as TaskForm } from "./task-row-uJMGSKAt.mjs";
import { i as overdueTasks } from "./stats-Bd-3R7Pz.mjs";
import { t as EmptyState } from "./empty-state-QVt8-KMD.mjs";
import { n as Root2, r as Trigger, t as List } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tarefas-Cz9wzlzh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center justify-center rounded-xl bg-secondary p-1 text-muted-foreground", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TasksPage() {
	const tasks = useAppStore((s) => s.tasks);
	const [filter, setFilter] = (0, import_react.useState)("abertas");
	const [kind, setKind] = (0, import_react.useState)("todas");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)();
	const today = todayIso();
	const visible = (0, import_react.useMemo)(() => {
		return tasks.filter((t) => {
			if (kind !== "todas" && t.kind !== kind) return false;
			if (filter === "abertas") return !t.done;
			if (filter === "hoje") return !t.done && t.dueDate === today;
			if (filter === "atrasadas") return !t.done && Boolean(t.dueDate && t.dueDate < today);
			return t.done;
		}).sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999"));
	}, [
		tasks,
		filter,
		kind,
		today
	]);
	const late = overdueTasks(tasks).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Checklist",
				title: "Tarefas",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Nova"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: filter,
					onValueChange: (v) => setFilter(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "abertas",
								children: "Abertas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "hoje",
								children: "Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "atrasadas",
								children: ["Atrasadas", late ? ` ${late}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "feitas",
								children: "Feitas"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: kind,
					onValueChange: (v) => setKind(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "todas",
							children: "Todas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "tarefa",
							children: "Tarefa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "trabalho",
							children: "Trabalho"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "prova",
							children: "Prova"
						})
					] })
				})]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {
					className: "size-8",
					strokeWidth: 1.4
				}),
				title: "Nada nesta lista",
				hint: "Crie uma tarefa, um trabalho ou uma prova e atribua um prazo.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Nova tarefa"]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl bg-card p-2 shadow-[var(--shadow-border)] sm:p-3",
				children: visible.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRow, {
					task: t,
					onEdit: (task) => {
						setEditing(task);
						setOpen(true);
					}
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskForm, {
				open,
				onOpenChange: (v) => {
					setOpen(v);
					if (!v) setEditing(void 0);
				},
				task: editing
			})
		]
	});
}
//#endregion
export { TasksPage as component };

import { r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-QVt8-KMD.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon, title, hint, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-3 rounded-2xl bg-card px-6 py-12 text-center shadow-[var(--shadow-border)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg",
					children: title
				}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-sm text-muted-foreground",
					children: hint
				}) : null]
			}),
			action
		]
	});
}
//#endregion
export { EmptyState as t };

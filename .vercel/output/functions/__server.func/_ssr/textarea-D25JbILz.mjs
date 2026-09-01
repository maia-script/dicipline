import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 outline-none placeholder:text-muted-foreground/80 disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40", className),
		...props
	});
}
//#endregion
export { Textarea as t };

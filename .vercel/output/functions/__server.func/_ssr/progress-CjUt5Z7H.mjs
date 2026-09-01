import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-secondary", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full w-full flex-1 bg-primary transition-transform duration-300 ease-[var(--ease-out-smooth)]",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
//#endregion
export { Progress as t };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as todayIso, h as useAppStore, i as formatBytes, m as uid, n as assignToToday, r as cn } from "./store-C94gReo7.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as Input, t as Button } from "./label-CCYUPZiH.mjs";
import { S as BookOpen, f as FolderPlus, p as FileText, r as Trash2, s as Plus, u as Paperclip } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogTitle, d as Select, f as SelectContent, h as SelectValue, i as DialogHeader, m as SelectTrigger, n as DialogContent, p as SelectItem, r as DialogFooter, t as Dialog, u as Field } from "./dropdown-menu-BmpsJDat.mjs";
import { n as ToneDot, t as PageHeader } from "./tone-dot-B56sz6Mb.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BphI5S4Z.mjs";
import { n as StudyForm, t as StudyBlockCard } from "./study-block-card-CrhBr3TV.mjs";
import { t as Badge } from "./badge-aG3SbmQr.mjs";
import { t as EmptyState } from "./empty-state-QVt8-KMD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estudos-C-MYJqGO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DB_NAME = "dynamic-obsession";
var STORE = "files";
var VERSION = 1;
function openDb() {
	return new Promise((resolve, reject) => {
		if (typeof indexedDB === "undefined") {
			reject(/* @__PURE__ */ new Error("IndexedDB indisponível"));
			return;
		}
		const req = indexedDB.open(DB_NAME, VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("Falha ao abrir arquivos"));
	});
}
async function putBlob(id, blob) {
	const db = await openDb();
	try {
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
			tx.objectStore(STORE).put(blob, id);
		});
	} finally {
		db.close();
	}
}
async function getBlob(id) {
	const db = await openDb();
	try {
		return await new Promise((resolve, reject) => {
			const req = db.transaction(STORE, "readonly").objectStore(STORE).get(id);
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
	} finally {
		db.close();
	}
}
async function deleteBlob(id) {
	const db = await openDb();
	try {
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
			tx.objectStore(STORE).delete(id);
		});
	} finally {
		db.close();
	}
}
var TONES = [
	"slate",
	"taupe",
	"sage",
	"clay"
];
function StudiesPage() {
	const subjects = useAppStore((s) => s.subjects);
	const folders = useAppStore((s) => s.folders);
	const attachments = useAppStore((s) => s.attachments);
	const tasks = useAppStore((s) => s.tasks);
	const blocks = useAppStore((s) => s.studyBlocks);
	const addSubject = useAppStore((s) => s.addSubject);
	const addFolder = useAppStore((s) => s.addFolder);
	const addAttachment = useAppStore((s) => s.addAttachment);
	const removeAttachment = useAppStore((s) => s.removeAttachment);
	const removeFolder = useAppStore((s) => s.removeFolder);
	const removeSubject = useAppStore((s) => s.removeSubject);
	const fileRef = (0, import_react.useRef)(null);
	const [selected, setSelected] = (0, import_react.useState)(subjects[0]?.id ?? null);
	const [folderId, setFolderId] = (0, import_react.useState)(null);
	const [subjectOpen, setSubjectOpen] = (0, import_react.useState)(false);
	const [folderOpen, setFolderOpen] = (0, import_react.useState)(false);
	const [studyOpen, setStudyOpen] = (0, import_react.useState)(false);
	const [studyDefaults, setStudyDefaults] = (0, import_react.useState)({});
	const [preview, setPreview] = (0, import_react.useState)(null);
	const subject = subjects.find((s) => s.id === selected);
	const subjectFolders = folders.filter((f) => f.subjectId === selected);
	const activeFolder = subjectFolders.find((f) => f.id === folderId) ?? subjectFolders[0];
	const activeFolderId = activeFolder?.id;
	const folderFiles = attachments.filter((a) => a.folderId && a.folderId === activeFolderId);
	const folderTasks = tasks.filter((t) => t.folderId === activeFolderId);
	const todayBlocks = blocks.filter((b) => b.date === todayIso());
	async function attachFiles(list) {
		if (!list || !activeFolderId) return;
		for (const file of Array.from(list)) {
			if (file.size > 5242880) {
				toast.error(`${file.name} passa de 5 MB`);
				continue;
			}
			const id = uid();
			try {
				await putBlob(id, file);
				addAttachment({
					id,
					name: file.name,
					mime: file.type || "application/octet-stream",
					size: file.size,
					folderId: activeFolderId
				});
				toast.success(`${file.name} anexado`);
			} catch {
				toast.error("Não foi possível guardar o arquivo.");
			}
		}
	}
	async function openFile(file) {
		try {
			const blob = await getBlob(file.id);
			if (!blob) {
				toast.error("Arquivo não encontrado neste aparelho.");
				return;
			}
			const url = URL.createObjectURL(blob);
			if (file.mime.startsWith("image/") || file.mime === "application/pdf" || file.mime.startsWith("text/")) setPreview({
				url,
				mime: file.mime,
				name: file.name
			});
			else {
				const a = document.createElement("a");
				a.href = url;
				a.download = file.name;
				a.click();
				URL.revokeObjectURL(url);
			}
		} catch {
			toast.error("Falha ao abrir o arquivo.");
		}
	}
	async function destroyFile(file) {
		try {
			await deleteBlob(file.id);
		} catch {}
		removeAttachment(file.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Cofre",
				title: "Estudos",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setSubjectOpen(true),
						children: "Matéria"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setFolderOpen(true),
						disabled: !selected,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-4" }), "Pasta"]
					})]
				})
			}),
			subjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
					className: "size-8",
					strokeWidth: 1.4
				}),
				title: "Nenhuma matéria ainda",
				hint: "Crie uma matéria, pastas e anexe PDFs, listas ou provas.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setSubjectOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Nova matéria"]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[16rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1",
						children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setSelected(s.id);
								setFolderId(null);
							},
							className: cn("flex h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm", selected === s.id ? "bg-secondary" : "hover:bg-accent"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneDot, { tone: s.tone }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate",
								children: s.name
							})]
						}, s.id))
					}), subject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 text-[11px] tracking-wide text-muted-foreground uppercase",
							children: "Pastas"
						}), subjectFolders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 text-sm text-muted-foreground",
							children: "Nenhuma pasta."
						}) : subjectFolders.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFolderId(f.id),
							className: cn("flex h-10 w-full items-center rounded-lg px-3 text-left text-sm", activeFolderId === f.id ? "bg-accent" : "text-muted-foreground hover:bg-accent/60"),
							children: f.name
						}, f.id))]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex-row items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: activeFolder?.name ?? subject?.name ?? "Pasta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Anexe arquivos e atribua o conteúdo para hoje."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									disabled: !activeFolderId,
									onClick: () => fileRef.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }), "Anexar"]
								}), activeFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon-sm",
									variant: "ghost",
									"aria-label": "Excluir pasta",
									onClick: () => {
										removeFolder(activeFolder.id);
										setFolderId(null);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								}) : null]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "space-y-4",
							onDragOver: (e) => e.preventDefault(),
							onDrop: (e) => {
								e.preventDefault();
								attachFiles(e.dataTransfer.files);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									multiple: true,
									className: "hidden",
									onChange: (e) => {
										attachFiles(e.target.files);
										e.target.value = "";
									}
								}),
								folderFiles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground",
									children: "Arraste PDFs, imagens ou textos para esta pasta."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: folderFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "min-w-0 flex-1 truncate text-left text-sm",
												onClick: () => void openFile(file),
												children: [file.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-2 text-xs text-muted-foreground",
													children: formatBytes(file.size)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												onClick: () => {
													setStudyDefaults({
														content: file.name.replace(/\.[^.]+$/, ""),
														subjectId: selected ?? void 0,
														folderId: activeFolderId,
														attachmentId: file.id
													});
													setStudyOpen(true);
												},
												children: "Estudar hoje"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon-sm",
												variant: "ghost",
												"aria-label": "Excluir arquivo",
												onClick: () => void destroyFile(file),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									}, file.id))
								}),
								folderTasks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs tracking-wide text-muted-foreground uppercase",
									children: "Ligadas a esta pasta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1",
									children: folderTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: [t.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "ml-2",
												children: t.kind
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => assignToToday({
												content: t.title,
												subjectId: t.subjectId,
												taskId: t.id,
												folderId: t.folderId
											}),
											children: "Hoje"
										})]
									}, t.id))
								})] }) : null
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-xl",
									children: "Atribuído para hoje"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										setStudyDefaults({
											subjectId: selected ?? void 0,
											folderId: activeFolderId
										});
										setStudyOpen(true);
									},
									children: "Novo bloco"
								})]
							}), todayBlocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Nenhum conteúdo para hoje."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: todayBlocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyBlockCard, { block: b }, b.id))
							})]
						}),
						subject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "text-xs text-muted-foreground hover:text-destructive",
							onClick: () => {
								removeSubject(subject.id);
								setSelected(subjects.find((s) => s.id !== subject.id)?.id ?? null);
							},
							children: ["Excluir matéria ", subject.name]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectDialog, {
				open: subjectOpen,
				onOpenChange: setSubjectOpen,
				onSave: (name, tone) => {
					const id = addSubject(name, tone);
					setSelected(id);
					setSubjectOpen(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderDialog, {
				open: folderOpen,
				onOpenChange: setFolderOpen,
				subjects,
				defaultSubject: selected ?? void 0,
				onSave: (folder) => {
					const id = addFolder(folder);
					setSelected(folder.subjectId);
					setFolderId(id);
					setFolderOpen(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyForm, {
				open: studyOpen,
				onOpenChange: setStudyOpen,
				defaults: studyDefaults
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(preview),
				onOpenChange: (v) => {
					if (!v && preview) {
						URL.revokeObjectURL(preview.url);
						setPreview(null);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: preview?.name }) }), preview?.mime.startsWith("image/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview.url,
						alt: preview.name,
						className: "max-h-[70dvh] w-full rounded-lg object-contain"
					}) : preview?.mime === "application/pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: preview.name,
						src: preview.url,
						className: "h-[70dvh] w-full rounded-lg bg-background"
					}) : preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: preview.name,
						src: preview.url,
						className: "h-64 w-full rounded-lg bg-background"
					}) : null]
				})
			})
		]
	});
}
function SubjectDialog({ open, onOpenChange, onSave }) {
	const [name, setName] = (0, import_react.useState)("");
	const [tone, setTone] = (0, import_react.useState)("slate");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova matéria" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					autoFocus: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: TONES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTone(t),
						className: cn("flex size-11 items-center justify-center rounded-lg border", tone === t ? "border-primary" : "border-border"),
						"aria-label": t,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneDot, {
							tone: t,
							className: "size-3"
						})
					}, t))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => onOpenChange(false),
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => onSave(name.trim() || "Matéria", tone),
				children: "Salvar"
			})] })
		] })
	});
}
function FolderDialog({ open, onOpenChange, subjects, defaultSubject, onSave }) {
	const [name, setName] = (0, import_react.useState)("");
	const [subjectId, setSubjectId] = (0, import_react.useState)(defaultSubject ?? subjects[0]?.id ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (v) setSubjectId(defaultSubject ?? subjects[0]?.id ?? "");
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova pasta" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					autoFocus: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Matéria",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: subjectId,
					onValueChange: setSubjectId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: s.id,
						children: s.name
					}, s.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => onOpenChange(false),
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !subjectId,
				onClick: () => onSave({
					name: name.trim() || "Pasta",
					subjectId
				}),
				children: "Salvar"
			})] })
		] })
	});
}
//#endregion
export { StudiesPage as component };

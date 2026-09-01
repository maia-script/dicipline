import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BookOpen,
  FileText,
  FolderPlus,
  Paperclip,
  Plus,
  Trash2,
} from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Field } from "@/components/forms/fields";
import { StudyForm } from "@/components/forms/study-form";
import { PageHeader } from "@/components/layout/page-header";
import { StudyBlockCard } from "@/components/study-block-card";
import { ToneDot } from "@/components/tone-dot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { todayIso } from "@/lib/dates";
import { deleteBlob, getBlob, MAX_FILE_BYTES, putBlob } from "@/lib/files-db";
import { assignToToday, useAppStore } from "@/lib/store";
import type { Attachment, Folder, StudyBlock, Subject, SubjectTone } from "@/lib/types";
import { formatBytes, uid, cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/estudos")({
  component: StudiesPage,
});

const TONES: SubjectTone[] = ["slate", "taupe", "sage", "clay"];

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
  const fileRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [studyDefaults, setStudyDefaults] = useState<Partial<StudyBlock>>({});
  const [preview, setPreview] = useState<{ url: string; mime: string; name: string } | null>(null);

  const selectedId =
    selected && subjects.some((s) => s.id === selected) ? selected : (subjects[0]?.id ?? null);
  const subject = subjects.find((s) => s.id === selectedId);
  const subjectFolders = folders.filter((f) => f.subjectId === selectedId);
  const activeFolder =
    subjectFolders.find((f) => f.id === folderId) ?? subjectFolders[0];
  const activeFolderId = activeFolder?.id;

  const folderFiles = attachments.filter((a) => a.folderId && a.folderId === activeFolderId);
  const folderTasks = tasks.filter((t) => t.folderId === activeFolderId);
  const todayBlocks = blocks.filter((b) => b.date === todayIso());

  async function attachFiles(list: FileList | null) {
    if (!list || !activeFolderId) return;
    for (const file of Array.from(list)) {
      if (file.size > MAX_FILE_BYTES) {
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
          folderId: activeFolderId,
        });
        toast.success(`${file.name} anexado`);
      } catch {
        toast.error("Não foi possível guardar o arquivo.");
      }
    }
  }

  async function openFile(file: Attachment) {
    try {
      const blob = await getBlob(file.id);
      if (!blob) {
        toast.error("Arquivo não encontrado neste aparelho.");
        return;
      }
      const url = URL.createObjectURL(blob);
      if (file.mime.startsWith("image/") || file.mime === "application/pdf" || file.mime.startsWith("text/")) {
        setPreview({ url, mime: file.mime, name: file.name });
      } else {
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

  async function destroyFile(file: Attachment) {
    try {
      await deleteBlob(file.id);
    } catch {
      /* ignore */
    }
    removeAttachment(file.id);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Cofre"
        title="Estudos"
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setSubjectOpen(true)}>
              Matéria
            </Button>
            <Button size="sm" onClick={() => setFolderOpen(true)} disabled={!selected}>
              <FolderPlus className="size-4" />
              Pasta
            </Button>
          </div>
        }
      />

      {subjects.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-8" strokeWidth={1.4} />}
          title="Nenhuma matéria ainda"
          hint="Crie uma matéria, pastas e anexe PDFs, listas ou provas."
          action={
            <Button onClick={() => setSubjectOpen(true)}>
              <Plus className="size-4" />
              Nova matéria
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
          <aside className="space-y-4">
            <div className="space-y-1">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelected(s.id);
                    setFolderId(null);
                  }}
                  className={cn(
                    "flex h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm",
                    selected === s.id || (!selected && s.id === selectedId) ? "bg-secondary" : "hover:bg-accent",
                  )}
                >
                  <ToneDot tone={s.tone} />
                  <span className="flex-1 truncate">{s.name}</span>
                </button>
              ))}
            </div>
            {subject ? (
              <div className="space-y-1">
                <p className="px-1 text-[11px] tracking-wide text-muted-foreground uppercase">
                  Pastas
                </p>
                {subjectFolders.length === 0 ? (
                  <p className="px-1 text-sm text-muted-foreground">Nenhuma pasta.</p>
                ) : (
                  subjectFolders.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFolderId(f.id)}
                      className={cn(
                        "flex h-10 w-full items-center rounded-lg px-3 text-left text-sm",
                        activeFolderId === f.id ? "bg-accent" : "text-muted-foreground hover:bg-accent/60",
                      )}
                    >
                      {f.name}
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </aside>

          <div className="space-y-5">
            <Card>
              <CardHeader className="flex-row items-center justify-between gap-2">
                <div>
                  <CardTitle>{activeFolder?.name ?? subject?.name ?? "Pasta"}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Anexe arquivos e atribua o conteúdo para hoje.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!activeFolderId}
                    onClick={() => fileRef.current?.click()}
                  >
                    <Paperclip className="size-4" />
                    Anexar
                  </Button>
                  {activeFolder ? (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Excluir pasta"
                      onClick={() => {
                        removeFolder(activeFolder.id);
                        setFolderId(null);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent
                className="space-y-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  void attachFiles(e.dataTransfer.files);
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    void attachFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                {folderFiles.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                    Arraste PDFs, imagens ou textos para esta pasta.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {folderFiles.map((file) => (
                      <li
                        key={file.id}
                        className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5"
                      >
                        <FileText className="size-4 text-muted-foreground" />
                        <button
                          type="button"
                          className="min-w-0 flex-1 truncate text-left text-sm"
                          onClick={() => void openFile(file)}
                        >
                          {file.name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                          </span>
                        </button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setStudyDefaults({
                              content: file.name.replace(/\.[^.]+$/, ""),
                              subjectId: selected ?? undefined,
                              folderId: activeFolderId,
                              attachmentId: file.id,
                            });
                            setStudyOpen(true);
                          }}
                        >
                          Estudar hoje
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          aria-label="Excluir arquivo"
                          onClick={() => void destroyFile(file)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                {folderTasks.length > 0 ? (
                  <div>
                    <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
                      Ligadas a esta pasta
                    </p>
                    <ul className="space-y-1">
                      {folderTasks.map((t) => (
                        <li key={t.id} className="flex items-center justify-between gap-2 text-sm">
                          <span className="truncate">
                            {t.title}
                            <Badge variant="outline" className="ml-2">
                              {t.kind}
                            </Badge>
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              assignToToday({
                                content: t.title,
                                subjectId: t.subjectId,
                                taskId: t.id,
                                folderId: t.folderId,
                              })
                            }
                          >
                            Hoje
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl">Atribuído para hoje</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setStudyDefaults({
                      subjectId: selected ?? undefined,
                      folderId: activeFolderId,
                    });
                    setStudyOpen(true);
                  }}
                >
                  Novo bloco
                </Button>
              </div>
              {todayBlocks.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum conteúdo para hoje.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {todayBlocks.map((b) => (
                    <StudyBlockCard key={b.id} block={b} />
                  ))}
                </div>
              )}
            </section>

            {subject ? (
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-destructive"
                onClick={() => {
                  removeSubject(subject.id);
                  setSelected(subjects.find((s) => s.id !== subject.id)?.id ?? null);
                }}
              >
                Excluir matéria {subject.name}
              </button>
            ) : null}
          </div>
        </div>
      )}

      <SubjectDialog
        open={subjectOpen}
        onOpenChange={setSubjectOpen}
        onSave={(name, tone) => {
          const id = addSubject(name, tone);
          setSelected(id);
          setSubjectOpen(false);
        }}
      />
      <FolderDialog
        open={folderOpen}
        onOpenChange={setFolderOpen}
        subjects={subjects}
        defaultSubject={selected ?? undefined}
        onSave={(folder) => {
          const id = addFolder(folder);
          setSelected(folder.subjectId);
          setFolderId(id);
          setFolderOpen(false);
        }}
      />
      <StudyForm
        open={studyOpen}
        onOpenChange={setStudyOpen}
        defaults={studyDefaults}
      />

      <Dialog
        open={Boolean(preview)}
        onOpenChange={(v) => {
          if (!v && preview) {
            URL.revokeObjectURL(preview.url);
            setPreview(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
          </DialogHeader>
          {preview?.mime.startsWith("image/") ? (
            <img src={preview.url} alt={preview.name} className="max-h-[70dvh] w-full rounded-lg object-contain" />
          ) : preview?.mime === "application/pdf" ? (
            <iframe title={preview.name} src={preview.url} className="h-[70dvh] w-full rounded-lg bg-background" />
          ) : preview ? (
            <iframe title={preview.name} src={preview.url} className="h-64 w-full rounded-lg bg-background" />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SubjectDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (name: string, tone: SubjectTone) => void;
}) {
  const [name, setName] = useState("");
  const [tone, setTone] = useState<SubjectTone>("slate");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova matéria</DialogTitle>
        </DialogHeader>
        <Field label="Nome">
          <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </Field>
        <Field label="Cor">
          <div className="flex gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={cn(
                  "flex size-11 items-center justify-center rounded-lg border",
                  tone === t ? "border-primary" : "border-border",
                )}
                aria-label={t}
              >
                <ToneDot tone={t} className="size-3" />
              </button>
            ))}
          </div>
        </Field>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(name.trim() || "Matéria", tone)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FolderDialog({
  open,
  onOpenChange,
  subjects,
  defaultSubject,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  subjects: Subject[];
  defaultSubject?: string;
  onSave: (folder: Omit<Folder, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [subjectId, setSubjectId] = useState(defaultSubject ?? subjects[0]?.id ?? "");
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) setSubjectId(defaultSubject ?? subjects[0]?.id ?? "");
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova pasta</DialogTitle>
        </DialogHeader>
        <Field label="Nome">
          <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </Field>
        <Field label="Matéria">
          <Select value={subjectId} onValueChange={setSubjectId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            disabled={!subjectId}
            onClick={() => onSave({ name: name.trim() || "Pasta", subjectId })}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

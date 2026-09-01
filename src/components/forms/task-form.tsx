import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/forms/fields";
import { useAppStore } from "@/lib/store";
import type { Priority, Task, TaskKind } from "@/lib/types";
import { todayIso } from "@/lib/dates";

const NONE = "__none";

export function TaskForm({
  open,
  onOpenChange,
  task,
  defaults,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  task?: Task;
  defaults?: Partial<Pick<Task, "dueDate" | "subjectId" | "folderId" | "kind">>;
}) {
  const subjects = useAppStore((s) => s.subjects);
  const addTask = useAppStore((s) => s.addTask);
  const updateTask = useAppStore((s) => s.updateTask);
  const [title, setTitle] = useState(task?.title ?? "");
  const [notes, setNotes] = useState(task?.notes ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? defaults?.dueDate ?? todayIso());
  const [kind, setKind] = useState<TaskKind>(task?.kind ?? defaults?.kind ?? "tarefa");
  const [priority, setPriority] = useState<Priority>(task?.priority ?? "media");
  const [subjectId, setSubjectId] = useState(task?.subjectId ?? defaults?.subjectId ?? NONE);

  useEffect(() => {
    if (!open) return;
    setTitle(task?.title ?? "");
    setNotes(task?.notes ?? "");
    setDueDate(task?.dueDate ?? defaults?.dueDate ?? todayIso());
    setKind(task?.kind ?? defaults?.kind ?? "tarefa");
    setPriority(task?.priority ?? "media");
    setSubjectId(task?.subjectId ?? defaults?.subjectId ?? NONE);
  }, [open, task, defaults?.dueDate, defaults?.kind, defaults?.subjectId]);

  function save() {
    const payload = {
      title: title.trim() || "Sem título",
      notes,
      dueDate: dueDate || undefined,
      kind,
      priority,
      subjectId: subjectId === NONE ? undefined : subjectId,
      folderId: task?.folderId ?? defaults?.folderId,
    };
    if (task) updateTask(task.id, payload);
    else addTask(payload);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Field label="Título">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo">
              <Select value={kind} onValueChange={(v) => setKind(v as TaskKind)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tarefa">Tarefa</SelectItem>
                  <SelectItem value="trabalho">Trabalho</SelectItem>
                  <SelectItem value="prova">Prova</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Prioridade">
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prazo">
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Field>
            <Field label="Matéria">
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Nenhuma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Nenhuma</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Notas">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={save}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

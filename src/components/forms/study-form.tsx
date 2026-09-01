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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/forms/fields";
import { todayIso } from "@/lib/dates";
import { useAppStore } from "@/lib/store";
import type { StudyBlock } from "@/lib/types";

const NONE = "__none";

export function StudyForm({
  open,
  onOpenChange,
  block,
  defaults,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  block?: StudyBlock;
  defaults?: Partial<Pick<StudyBlock, "date" | "subjectId" | "folderId" | "taskId" | "content">>;
}) {
  const subjects = useAppStore((s) => s.subjects);
  const addStudyBlock = useAppStore((s) => s.addStudyBlock);
  const updateStudyBlock = useAppStore((s) => s.updateStudyBlock);
  const [content, setContent] = useState(block?.content ?? defaults?.content ?? "");
  const [date, setDate] = useState(block?.date ?? defaults?.date ?? todayIso());
  const [minutesGoal, setMinutesGoal] = useState(String(block?.minutesGoal ?? 40));
  const [subjectId, setSubjectId] = useState(block?.subjectId ?? defaults?.subjectId ?? NONE);

  useEffect(() => {
    if (!open) return;
    setContent(block?.content ?? defaults?.content ?? "");
    setDate(block?.date ?? defaults?.date ?? todayIso());
    setMinutesGoal(String(block?.minutesGoal ?? 40));
    setSubjectId(block?.subjectId ?? defaults?.subjectId ?? NONE);
  }, [open, block, defaults?.content, defaults?.date, defaults?.subjectId]);

  function save() {
    const payload = {
      content: content.trim() || "Estudo",
      date,
      minutesGoal: Number(minutesGoal) || 40,
      subjectId: subjectId === NONE ? undefined : subjectId,
      folderId: block?.folderId ?? defaults?.folderId,
      taskId: block?.taskId ?? defaults?.taskId,
    };
    if (block) updateStudyBlock(block.id, payload);
    else addStudyBlock(payload);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{block ? "Editar estudo" : "Estudar hoje"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Field label="O que estudar">
            <Input value={content} onChange={(e) => setContent(e.target.value)} autoFocus />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Data">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Meta (min)">
              <Input
                type="number"
                min={10}
                value={minutesGoal}
                onChange={(e) => setMinutesGoal(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Matéria">
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger>
                <SelectValue />
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

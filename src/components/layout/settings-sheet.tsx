import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppStore } from "@/lib/store";
import type { AppData } from "@/lib/types";

export function SettingsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const goals = useAppStore((s) => s.goals);
  const setGoals = useAppStore((s) => s.setGoals);
  const loadDemo = useAppStore((s) => s.loadDemo);
  const resetAll = useAppStore((s) => s.resetAll);
  const importData = useAppStore((s) => s.importData);
  const fileRef = useRef<HTMLInputElement>(null);
  const [notifyOn, setNotifyOn] = useState(false);

  useEffect(() => {
    setNotifyOn(typeof Notification !== "undefined" && Notification.permission === "granted");
  }, []);

  async function enableNotify(next: boolean) {
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
    const data: AppData = {
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
      clearedByUser: s.clearedByUser,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dynamic-obsession.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function onImport(file?: File) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as AppData;
      if (!Array.isArray(parsed.tasks) || !Array.isArray(parsed.events)) {
        throw new Error("arquivo inválido");
      }
      importData(parsed);
      toast.success("Dados importados.");
    } catch {
      toast.error("Não foi possível ler esse arquivo.");
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Ajustes</SheetTitle>
          <SheetDescription>Metas, avisos e dados desta agenda.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 pb-8">
          <section className="space-y-3">
            <h3 className="text-sm font-medium">Metas</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="daily">Minutos / dia</Label>
                <Input
                  id="daily"
                  type="number"
                  min={15}
                  max={720}
                  value={goals.dailyMinutes}
                  onChange={(e) =>
                    setGoals({ ...goals, dailyMinutes: Number(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="weekly">Minutos / semana</Label>
                <Input
                  id="weekly"
                  type="number"
                  min={30}
                  max={4000}
                  value={goals.weeklyMinutes}
                  onChange={(e) =>
                    setGoals({ ...goals, weeklyMinutes: Number(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          </section>

          <section className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Avisos de eventos</p>
              <p className="text-xs text-muted-foreground">
                Notificação do sistema quando um compromisso estiver perto.
              </p>
            </div>
            <Switch checked={notifyOn} onCheckedChange={(v) => void enableNotify(v)} />
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-medium">Dados</h3>
            <p className="text-xs text-muted-foreground">
              Tudo fica neste aparelho. Arquivos anexados não entram no JSON.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={exportJson}>
                Exportar JSON
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                Importar JSON
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => void onImport(e.target.files?.[0])}
              />
              <Button
                variant="outline"
                onClick={() => {
                  loadDemo();
                  toast.message("Exemplo carregado.");
                }}
              >
                Carregar exemplo
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  resetAll();
                  toast.message("Agenda zerada.");
                }}
              >
                Começar do zero
              </Button>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

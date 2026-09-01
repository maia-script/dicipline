import { type ReactNode, useState } from "react";
import { Bell, Settings } from "lucide-react";
import { BrandWordmark } from "@/components/brand-mark";
import { BottomNav, SideNav } from "@/components/layout/nav";
import { FocusBar } from "@/components/layout/focus-bar";
import { ReminderTicker } from "@/components/layout/reminders";
import { SettingsSheet } from "@/components/layout/settings-sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDayLong } from "@/lib/dates";
import { KIND_LABEL } from "@/lib/schedule";
import { useAppStore } from "@/lib/store";
import { useStoreReady } from "@/hooks/use-store-ready";

export function AppShell({ children }: { children: ReactNode }) {
  const ready = useStoreReady();
  const [settings, setSettings] = useState(false);

  return (
    <div className="min-h-dvh">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-background/80 px-4 py-6 md:flex">
        <BrandWordmark />
        <div className="mt-8 flex-1">
          <SideNav />
        </div>
        <div className="flex items-center gap-1">
          <UpcomingBell />
          <Button variant="ghost" className="flex-1 justify-start" onClick={() => setSettings(true)}>
            <Settings className="size-4" />
            Ajustes
          </Button>
        </div>
      </aside>

      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:hidden">
        <BrandWordmark compact />
        <div className="flex items-center">
          <UpcomingBell />
          <Button size="icon" variant="ghost" onClick={() => setSettings(true)} aria-label="Ajustes">
            <Settings className="size-5" />
          </Button>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 md:ml-60 md:px-8 md:py-8 md:pb-12">
        {ready ? children : <BootSkeleton />}
      </main>

      <BottomNav />
      {ready ? <FocusBar /> : null}
      {ready ? <ReminderTicker /> : null}
      <SettingsSheet open={settings} onOpenChange={setSettings} />
    </div>
  );
}

function UpcomingBell() {
  const events = useAppStore((s) => s.events);
  const upcoming = [...events]
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => `${a.date}${a.time ?? ""}`.localeCompare(`${b.date}${b.time ?? ""}`))
    .slice(0, 5);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Próximos eventos">
          <Bell className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <p className="text-sm font-medium">Próximos avisos</p>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nenhum evento à frente.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {upcoming.map((e) => (
              <li key={e.id} className="flex items-baseline justify-between gap-2 text-sm">
                <span className="truncate">{e.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDayLong(e.date)}
                  {e.time ? ` · ${e.time}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          {upcoming[0] ? KIND_LABEL[upcoming[0].kind] : "Agenda vazia"}
        </p>
      </PopoverContent>
    </Popover>
  );
}

function BootSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}

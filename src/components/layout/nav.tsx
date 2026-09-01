import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, ChartNoAxesCombined, ListChecks, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/", label: "Hoje", icon: SunMedium },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/tarefas", label: "Tarefas", icon: ListChecks },
  { to: "/estudos", label: "Estudos", icon: BookOpen },
  { to: "/progresso", label: "Progresso", icon: ChartNoAxesCombined },
] as const;

export function SideNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1" aria-label="Principal">
      {ITEMS.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
      aria-label="Principal"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-[10px] tracking-wide",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

import { useEffect } from "react";
import { toast } from "sonner";
import { parseDateTime } from "@/lib/dates";
import { KIND_LABEL } from "@/lib/schedule";
import { useAppStore } from "@/lib/store";

export function ReminderTicker() {
  const events = useAppStore((s) => s.events);
  const notifiedIds = useAppStore((s) => s.notifiedIds);
  const markNotified = useAppStore((s) => s.markNotified);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      for (const ev of events) {
        if (notifiedIds.includes(ev.id)) continue;
        const start = parseDateTime(ev.date, ev.time).getTime();
        const remindAt = start - ev.remindMinutes * 60_000;
        if (now >= remindAt && now <= start + 5 * 60_000) {
          const when = ev.time ? `às ${ev.time}` : "hoje";
          toast(ev.title, {
            description: `${KIND_LABEL[ev.kind]} ${when}`,
            duration: 8000,
          });
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            try {
              new Notification("Dynamic Obsession", {
                body: `${ev.title} ${when}`,
                tag: ev.id,
              });
            } catch {
              /* ignore */
            }
          }
          markNotified(ev.id);
        }
      }
    };
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, [events, notifiedIds, markNotified]);

  return null;
}

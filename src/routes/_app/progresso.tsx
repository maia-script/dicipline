import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GoalRing } from "@/components/goal-ring";
import { PageHeader } from "@/components/layout/page-header";
import { ToneDot } from "@/components/tone-dot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { isInWeek } from "@/lib/dates";
import {
  completionRate,
  lastNDays,
  streakDays,
  subjectBreakdown,
  todayMinutes,
  weekMinutes,
} from "@/lib/stats";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app/progresso")({
  component: ProgressPage,
});

function ProgressPage() {
  const blocks = useAppStore((s) => s.studyBlocks);
  const tasks = useAppStore((s) => s.tasks);
  const subjects = useAppStore((s) => s.subjects);
  const goals = useAppStore((s) => s.goals);
  const series = lastNDays(blocks, 14);
  const today = todayMinutes(blocks);
  const week = weekMinutes(blocks);
  const streak = streakDays(blocks);
  const rate = completionRate(blocks);
  const bySubject = subjectBreakdown(blocks, subjects);
  const doneWeek = tasks.filter(
    (t) => t.done && t.completedAt && isInWeek(t.completedAt.slice(0, 10)),
  ).length;
  const maxSubject = Math.max(1, ...bySubject.map((s) => s.minutes));

  return (
    <div className="space-y-8">
      <PageHeader kicker="Infográfico" title="Progresso" />

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="items-center py-6">
          <GoalRing value={today} max={goals.dailyMinutes} label="Meta do dia" />
        </Card>
        <Card className="items-center py-6">
          <GoalRing value={week} max={goals.weeklyMinutes} label="Meta da semana" />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disciplina</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Row label="Sequência" value={`${streak} dias`} />
            <Row label="Blocos cumpridos" value={`${Math.round(rate * 100)}%`} />
            <Row label="Tarefas feitas" value={`${doneWeek}`} />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Minutos estudados — 14 dias</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "var(--color-secondary)" }}
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  color: "var(--color-foreground)",
                }}
                formatter={(value) => [`${value} min`, "Estudo"]}
              />
              <Bar dataKey="minutes" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Por matéria nesta semana</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bySubject.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ainda sem minutos registrados.</p>
          ) : (
            bySubject.map((s) => (
              <div key={s.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2">
                    <ToneDot tone={s.tone} />
                    {s.name}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{s.minutes} min</span>
                </div>
                <Progress value={(s.minutes / maxSubject) * 100} />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-serif text-xl tabular-nums">{value}</span>
    </div>
  );
}

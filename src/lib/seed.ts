import type {
  AppData,
  Attachment,
  Folder,
  StudyBlock,
  StudyEvent,
  Subject,
  Task,
  WeekSlot,
} from "./types";
import { isoOffset, todayIso } from "./dates";

export const emptyTimer = {
  blockId: null,
  running: false,
  startedAt: null,
  accumulatedMs: 0,
} as const;

export function emptyData(): AppData {
  return {
    subjects: [],
    folders: [],
    tasks: [],
    events: [],
    attachments: [],
    studyBlocks: [],
    slots: [],
    goals: { dailyMinutes: 90, weeklyMinutes: 480 },
    notifiedIds: [],
    timer: { ...emptyTimer },
    demoLoaded: false,
    clearedByUser: false,
  };
}

export function buildDemo(): AppData {
  const subjects: Subject[] = [
    { id: "sub-calculo", name: "Cálculo II", tone: "slate" },
    { id: "sub-fisica", name: "Física", tone: "taupe" },
    { id: "sub-lit", name: "Literatura", tone: "sage" },
    { id: "sub-en", name: "Inglês", tone: "clay" },
  ];

  const folders: Folder[] = [
    { id: "fld-calc-listas", name: "Listas", subjectId: "sub-calculo" },
    { id: "fld-calc-provas", name: "Provas anteriores", subjectId: "sub-calculo" },
    { id: "fld-fis-resumos", name: "Resumos", subjectId: "sub-fisica" },
    { id: "fld-lit-ensaios", name: "Ensaios", subjectId: "sub-lit" },
    { id: "fld-en-vocab", name: "Vocabulário", subjectId: "sub-en" },
  ];

  const now = new Date().toISOString();
  const today = todayIso();

  const tasks: Task[] = [
    {
      id: "tsk-integrais",
      title: "Lista 4 — integrais por partes",
      notes: "Exercícios 1 a 12. Marcar dúvidas da 7 e da 10.",
      done: false,
      dueDate: today,
      subjectId: "sub-calculo",
      folderId: "fld-calc-listas",
      kind: "tarefa",
      priority: "alta",
      createdAt: now,
    },
    {
      id: "tsk-newton",
      title: "Revisar leis de Newton",
      notes: "Foco em diagramas de corpo livre.",
      done: false,
      dueDate: isoOffset(1),
      subjectId: "sub-fisica",
      folderId: "fld-fis-resumos",
      kind: "tarefa",
      priority: "media",
      createdAt: now,
    },
    {
      id: "tsk-ensaio",
      title: "Ensaio: Machado e o narrador",
      notes: "Rascunho de 800 palavras. Citar dois contos.",
      done: false,
      dueDate: isoOffset(3),
      subjectId: "sub-lit",
      folderId: "fld-lit-ensaios",
      kind: "trabalho",
      priority: "alta",
      createdAt: now,
    },
    {
      id: "tsk-phrasal",
      title: "20 phrasal verbs — unidade 6",
      notes: "",
      done: false,
      dueDate: isoOffset(2),
      subjectId: "sub-en",
      folderId: "fld-en-vocab",
      kind: "tarefa",
      priority: "baixa",
      createdAt: now,
    },
    {
      id: "tsk-prova-fis",
      title: "Prova de gravitação",
      notes: "Capítulos 8 e 9. Sem consulta.",
      done: false,
      dueDate: isoOffset(5),
      subjectId: "sub-fisica",
      kind: "prova",
      priority: "alta",
      createdAt: now,
    },
    {
      id: "tsk-feita",
      title: "Ler capítulo 3 — Memórias Póstumas",
      notes: "",
      done: true,
      dueDate: isoOffset(-1),
      subjectId: "sub-lit",
      kind: "tarefa",
      priority: "media",
      createdAt: now,
      completedAt: new Date(Date.now() - 26 * 3600_000).toISOString(),
    },
  ];

  const events: StudyEvent[] = [
    {
      id: "ev-aula-calc",
      title: "Aula de Cálculo — integrais",
      date: today,
      time: "19:00",
      durationMin: 120,
      notes: "Sala 204. Levar lista 4.",
      kind: "aula",
      remindMinutes: 30,
      subjectId: "sub-calculo",
    },
    {
      id: "ev-estudo-fis",
      title: "Bloco de revisão — Física",
      date: today,
      time: "16:30",
      durationMin: 60,
      notes: "",
      kind: "estudo",
      remindMinutes: 15,
      subjectId: "sub-fisica",
    },
    {
      id: "ev-entrega",
      title: "Entrega do ensaio",
      date: isoOffset(3),
      time: "23:59",
      durationMin: 15,
      notes: "PDF no portal da disciplina.",
      kind: "entrega",
      remindMinutes: 120,
      subjectId: "sub-lit",
    },
    {
      id: "ev-prova",
      title: "Prova de gravitação",
      date: isoOffset(5),
      time: "10:00",
      durationMin: 90,
      notes: "Levar documento e calculadora não-gráfica.",
      kind: "prova",
      remindMinutes: 60,
      subjectId: "sub-fisica",
    },
    {
      id: "ev-simulado",
      title: "Simulado de Cálculo",
      date: isoOffset(8),
      time: "09:00",
      durationMin: 180,
      notes: "",
      kind: "prova",
      remindMinutes: 60,
      subjectId: "sub-calculo",
    },
  ];

  const slots: WeekSlot[] = [
    { id: "sl-1", weekday: 1, start: "19:00", end: "21:00", title: "Cálculo — teoria", subjectId: "sub-calculo" },
    { id: "sl-2", weekday: 2, start: "18:00", end: "19:30", title: "Física — exercícios", subjectId: "sub-fisica" },
    { id: "sl-3", weekday: 3, start: "20:00", end: "21:00", title: "Inglês — listening", subjectId: "sub-en" },
    { id: "sl-4", weekday: 4, start: "19:00", end: "21:00", title: "Literatura — leitura", subjectId: "sub-lit" },
    { id: "sl-5", weekday: 5, start: "18:00", end: "19:00", title: "Revisão da semana", subjectId: "sub-calculo" },
    { id: "sl-6", weekday: 6, start: "10:00", end: "12:00", title: "Simulado / listas", subjectId: "sub-fisica" },
  ];

  const contents = [
    "Integrais por partes",
    "Séries de Taylor — resumo",
    "Leis de Newton, DCL",
    "Gravitação: Kepler",
    "Contos de Machado",
    "Phrasal verbs unidade 5",
    "Limites laterais",
    "Energia potencial",
  ];

  const studyBlocks: StudyBlock[] = [
    {
      id: "blk-today-1",
      date: today,
      content: "Integrais por partes — lista 4",
      minutesGoal: 45,
      minutesDone: 12,
      subjectId: "sub-calculo",
      taskId: "tsk-integrais",
      folderId: "fld-calc-listas",
      done: false,
    },
    {
      id: "blk-today-2",
      date: today,
      content: "Resumo de gravitação, capítulos 8–9",
      minutesGoal: 40,
      minutesDone: 0,
      subjectId: "sub-fisica",
      folderId: "fld-fis-resumos",
      done: false,
    },
  ];

  for (let i = 1; i <= 16; i++) {
    const skip = i % 7 === 6;
    if (skip) continue;
    const minutes = 35 + ((i * 11) % 50);
    const goal = 60;
    studyBlocks.push({
      id: `blk-past-${i}`,
      date: isoOffset(-i),
      content: contents[i % contents.length] ?? "Revisão",
      minutesGoal: goal,
      minutesDone: minutes,
      subjectId: subjects[i % subjects.length]?.id,
      done: minutes >= goal * 0.7,
    });
  }

  const attachments: Attachment[] = [];

  return {
    subjects,
    folders,
    tasks,
    events,
    attachments,
    studyBlocks,
    slots,
    goals: { dailyMinutes: 90, weeklyMinutes: 480 },
    notifiedIds: [],
    timer: { ...emptyTimer },
    demoLoaded: true,
    clearedByUser: false,
  };
}

export type SubjectTone = "slate" | "taupe" | "sage" | "clay";

export type TaskKind = "tarefa" | "trabalho" | "prova";

export type EventKind = "aula" | "estudo" | "prova" | "entrega" | "outro";

export type Priority = "baixa" | "media" | "alta";

export interface Subject {
  id: string;
  name: string;
  tone: SubjectTone;
}

export interface Folder {
  id: string;
  name: string;
  subjectId: string;
  parentId?: string;
}

export interface Task {
  id: string;
  title: string;
  notes: string;
  done: boolean;
  dueDate?: string;
  subjectId?: string;
  folderId?: string;
  kind: TaskKind;
  priority: Priority;
  createdAt: string;
  completedAt?: string;
}

export interface StudyEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  durationMin?: number;
  notes: string;
  kind: EventKind;
  remindMinutes: number;
  subjectId?: string;
}

export interface Attachment {
  id: string;
  name: string;
  mime: string;
  size: number;
  folderId?: string;
  taskId?: string;
  createdAt: string;
}

export interface StudyBlock {
  id: string;
  date: string;
  content: string;
  minutesGoal: number;
  minutesDone: number;
  subjectId?: string;
  taskId?: string;
  attachmentId?: string;
  folderId?: string;
  done: boolean;
}

export interface WeekSlot {
  id: string;
  weekday: number;
  start: string;
  end: string;
  title: string;
  subjectId?: string;
}

export interface Goals {
  dailyMinutes: number;
  weeklyMinutes: number;
}

export interface FocusTimer {
  blockId: string | null;
  running: boolean;
  startedAt: number | null;
  accumulatedMs: number;
}

export interface AppData {
  subjects: Subject[];
  folders: Folder[];
  tasks: Task[];
  events: StudyEvent[];
  attachments: Attachment[];
  studyBlocks: StudyBlock[];
  slots: WeekSlot[];
  goals: Goals;
  notifiedIds: string[];
  timer: FocusTimer;
  demoLoaded: boolean;
  clearedByUser: boolean;
}

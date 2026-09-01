import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { todayIso } from "./dates";
import { emptyTimer, emptyData, buildDemo } from "./seed";
import type {
  AppData,
  Attachment,
  Folder,
  Goals,
  StudyBlock,
  StudyEvent,
  Subject,
  Task,
  WeekSlot,
} from "./types";
import { uid } from "./utils";

type AppState = AppData & {
  hydrateFlag: number;
  loadDemo: () => void;
  resetAll: () => void;
  setGoals: (goals: Goals) => void;
  addSubject: (name: string, tone: Subject["tone"]) => string;
  updateSubject: (id: string, patch: Partial<Subject>) => void;
  removeSubject: (id: string) => void;
  addFolder: (input: Omit<Folder, "id">) => string;
  updateFolder: (id: string, patch: Partial<Folder>) => void;
  removeFolder: (id: string) => void;
  addTask: (input: Omit<Task, "id" | "createdAt" | "done" | "completedAt">) => string;
  updateTask: (id: string, patch: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addEvent: (input: Omit<StudyEvent, "id">) => string;
  updateEvent: (id: string, patch: Partial<StudyEvent>) => void;
  removeEvent: (id: string) => void;
  markNotified: (id: string) => void;
  addAttachment: (input: Omit<Attachment, "id" | "createdAt"> & { id?: string }) => string;
  removeAttachment: (id: string) => void;
  addStudyBlock: (input: Omit<StudyBlock, "id" | "done" | "minutesDone"> & { minutesDone?: number }) => string;
  updateStudyBlock: (id: string, patch: Partial<StudyBlock>) => void;
  removeStudyBlock: (id: string) => void;
  logMinutes: (blockId: string, minutes: number) => void;
  addSlot: (input: Omit<WeekSlot, "id">) => string;
  updateSlot: (id: string, patch: Partial<WeekSlot>) => void;
  removeSlot: (id: string) => void;
  startTimer: (blockId: string) => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  importData: (data: AppData) => void;
};

function persistable(s: AppState): AppData {
  return {
    subjects: s.subjects,
    folders: s.folders,
    tasks: s.tasks,
    events: s.events,
    attachments: s.attachments,
    studyBlocks: s.studyBlocks,
    slots: s.slots,
    goals: s.goals,
    notifiedIds: s.notifiedIds,
    timer: s.timer.running
      ? s.timer
      : { ...emptyTimer, blockId: s.timer.blockId, accumulatedMs: s.timer.accumulatedMs },
    demoLoaded: s.demoLoaded,
    clearedByUser: s.clearedByUser,
  };
}

function flushTimer<T extends AppData>(s: T, clear = true): T {
  const extra =
    s.timer.running && s.timer.startedAt ? Math.max(0, Date.now() - s.timer.startedAt) : 0;
  const total = s.timer.accumulatedMs + extra;
  const minutes = Math.round(total / 60000);
  const studyBlocks =
    minutes > 0 && s.timer.blockId
      ? s.studyBlocks.map((b) => {
          if (b.id !== s.timer.blockId) return b;
          const minutesDone = b.minutesDone + minutes;
          return { ...b, minutesDone, done: minutesDone >= b.minutesGoal ? true : b.done };
        })
      : s.studyBlocks;
  return {
    ...s,
    studyBlocks,
    timer: clear
      ? { ...emptyTimer }
      : {
          ...s.timer,
          running: false,
          startedAt: null,
          accumulatedMs: total,
        },
  };
}

function browserStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...emptyData(),
      hydrateFlag: 0,
      loadDemo: () => set({ ...buildDemo(), hydrateFlag: get().hydrateFlag + 1 }),
      resetAll: () =>
        set({
          ...emptyData(),
          clearedByUser: true,
          demoLoaded: false,
          hydrateFlag: get().hydrateFlag + 1,
        }),
      setGoals: (goals) => set({ goals }),
      addSubject: (name, tone) => {
        const id = uid();
        set((s) => ({ subjects: [...s.subjects, { id, name, tone }] }));
        return id;
      },
      updateSubject: (id, patch) =>
        set((s) => ({
          subjects: s.subjects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeSubject: (id) =>
        set((s) => ({
          subjects: s.subjects.filter((x) => x.id !== id),
          folders: s.folders.filter((x) => x.subjectId !== id),
          tasks: s.tasks.map((t) => (t.subjectId === id ? { ...t, subjectId: undefined } : t)),
          events: s.events.map((e) => (e.subjectId === id ? { ...e, subjectId: undefined } : e)),
          studyBlocks: s.studyBlocks.map((b) => (b.subjectId === id ? { ...b, subjectId: undefined } : b)),
          slots: s.slots.map((sl) => (sl.subjectId === id ? { ...sl, subjectId: undefined } : sl)),
        })),
      addFolder: (input) => {
        const id = uid();
        set((s) => ({ folders: [...s.folders, { ...input, id }] }));
        return id;
      },
      updateFolder: (id, patch) =>
        set((s) => ({
          folders: s.folders.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeFolder: (id) =>
        set((s) => ({
          folders: s.folders.filter((x) => x.id !== id && x.parentId !== id),
          tasks: s.tasks.map((t) => (t.folderId === id ? { ...t, folderId: undefined } : t)),
          attachments: s.attachments.map((a) => (a.folderId === id ? { ...a, folderId: undefined } : a)),
          studyBlocks: s.studyBlocks.map((b) => (b.folderId === id ? { ...b, folderId: undefined } : b)),
        })),
      addTask: (input) => {
        const id = uid();
        set((s) => ({
          tasks: [
            ...s.tasks,
            { ...input, id, createdAt: new Date().toISOString(), done: false },
          ],
        }));
        return id;
      },
      updateTask: (id, patch) =>
        set((s) => ({
          tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((x) => {
            if (x.id !== id) return x;
            const done = !x.done;
            return {
              ...x,
              done,
              completedAt: done ? new Date().toISOString() : undefined,
            };
          }),
        })),
      removeTask: (id) =>
        set((s) => ({
          tasks: s.tasks.filter((x) => x.id !== id),
          studyBlocks: s.studyBlocks.map((b) => (b.taskId === id ? { ...b, taskId: undefined } : b)),
          attachments: s.attachments.map((a) => (a.taskId === id ? { ...a, taskId: undefined } : a)),
        })),
      addEvent: (input) => {
        const id = uid();
        set((s) => ({ events: [...s.events, { ...input, id }] }));
        return id;
      },
      updateEvent: (id, patch) =>
        set((s) => ({
          events: s.events.map((x) => (x.id === id ? { ...x, ...patch } : x)),
          notifiedIds: s.notifiedIds.filter((n) => n !== id),
        })),
      removeEvent: (id) =>
        set((s) => ({
          events: s.events.filter((x) => x.id !== id),
          notifiedIds: s.notifiedIds.filter((n) => n !== id),
        })),
      markNotified: (id) =>
        set((s) => ({
          notifiedIds: s.notifiedIds.includes(id) ? s.notifiedIds : [...s.notifiedIds, id],
        })),
      addAttachment: (input) => {
        const id = input.id ?? uid();
        set((s) => ({
          attachments: [
            ...s.attachments,
            {
              id,
              name: input.name,
              mime: input.mime,
              size: input.size,
              folderId: input.folderId,
              taskId: input.taskId,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
        return id;
      },
      removeAttachment: (id) =>
        set((s) => ({
          attachments: s.attachments.filter((x) => x.id !== id),
          studyBlocks: s.studyBlocks.map((b) =>
            b.attachmentId === id ? { ...b, attachmentId: undefined } : b,
          ),
        })),
      addStudyBlock: (input) => {
        const id = uid();
        set((s) => ({
          studyBlocks: [
            ...s.studyBlocks,
            {
              ...input,
              id,
              minutesDone: input.minutesDone ?? 0,
              done: false,
            },
          ],
        }));
        return id;
      },
      updateStudyBlock: (id, patch) =>
        set((s) => ({
          studyBlocks: s.studyBlocks.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeStudyBlock: (id) =>
        set((s) => ({
          studyBlocks: s.studyBlocks.filter((x) => x.id !== id),
          timer: s.timer.blockId === id ? { ...emptyTimer } : s.timer,
        })),
      logMinutes: (blockId, minutes) => {
        if (minutes <= 0) return;
        set((s) => ({
          studyBlocks: s.studyBlocks.map((b) => {
            if (b.id !== blockId) return b;
            const minutesDone = b.minutesDone + minutes;
            return {
              ...b,
              minutesDone,
              done: minutesDone >= b.minutesGoal ? true : b.done,
            };
          }),
        }));
      },
      addSlot: (input) => {
        const id = uid();
        set((s) => ({ slots: [...s.slots, { ...input, id }] }));
        return id;
      },
      updateSlot: (id, patch) =>
        set((s) => ({
          slots: s.slots.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeSlot: (id) => set((s) => ({ slots: s.slots.filter((x) => x.id !== id) })),
      startTimer: (blockId) =>
        set((s) => {
          let next = s;
          if (s.timer.running && s.timer.blockId && s.timer.blockId !== blockId) {
            next = flushTimer(s, true);
          }
          const same = next.timer.blockId === blockId;
          return {
            ...next,
            timer: {
              blockId,
              running: true,
              startedAt: Date.now(),
              accumulatedMs: same ? next.timer.accumulatedMs : 0,
            },
          };
        }),
      pauseTimer: () =>
        set((s) => {
          const extra =
            s.timer.running && s.timer.startedAt ? Math.max(0, Date.now() - s.timer.startedAt) : 0;
          return {
            timer: {
              ...s.timer,
              running: false,
              startedAt: null,
              accumulatedMs: s.timer.accumulatedMs + extra,
            },
          };
        }),
      stopTimer: () => set((s) => flushTimer(s, true)),
      importData: (data) => set({ ...emptyData(), ...data, hydrateFlag: get().hydrateFlag + 1 }),
    }),
    {
      name: "dynamic-obsession-v1",
      storage: createJSONStorage(browserStorage),
      skipHydration: true,
      partialize: persistable,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.demoLoaded && !state.clearedByUser) {
          const demo = buildDemo();
          useAppStore.setState({ ...demo });
        }
      },
    },
  ),
);

export function timerElapsedMs(timer: AppData["timer"]) {
  if (!timer.running || !timer.startedAt) return timer.accumulatedMs;
  return timer.accumulatedMs + Math.max(0, Date.now() - timer.startedAt);
}

export function assignToToday(input: {
  content: string;
  minutesGoal?: number;
  subjectId?: string;
  taskId?: string;
  attachmentId?: string;
  folderId?: string;
}) {
  return useAppStore.getState().addStudyBlock({
    date: todayIso(),
    content: input.content,
    minutesGoal: input.minutesGoal ?? 40,
    subjectId: input.subjectId,
    taskId: input.taskId,
    attachmentId: input.attachmentId,
    folderId: input.folderId,
  });
}

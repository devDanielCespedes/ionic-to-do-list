import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskSchema } from "../shared/schemas";

interface TaskStore {
  tasks: Task[];
  archivedTasks: Task[];
  editingTask: Task | null;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  toggleTaskDone: (id: string) => void;
  archiveTask: (id: string) => void;
  restoreTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setEditingTask: (task: Task) => void;
  clearEditingTask: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      archivedTasks: [],
      editingTask: null,

      addTask: (task) =>
        set((state) => {
          const newTask = { ...task, id: uuidv4() };
          TaskSchema.parse(newTask);
          return { tasks: [...state.tasks, newTask] };
        }),

      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          editingTask: null,
        })),

      toggleTaskDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
        })),

      archiveTask: (id) =>
        set((state) => {
          const taskToArchive = state.tasks.find((task) => task.id === id);
          if (!taskToArchive) return state;
          return {
            tasks: state.tasks.filter((task) => task.id !== id),
            archivedTasks: [...state.archivedTasks, taskToArchive],
          };
        }),

      restoreTask: (id) =>
        set((state) => {
          const taskToRestore = state.archivedTasks.find((task) => task.id === id);
          if (!taskToRestore) return state;
          return {
            archivedTasks: state.archivedTasks.filter((task) => task.id !== id),
            tasks: [...state.tasks, taskToRestore],
          };
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          archivedTasks: state.archivedTasks.filter((task) => task.id !== id),
        })),

      setEditingTask: (task) => set({ editingTask: task }),
      clearEditingTask: () => set({ editingTask: null }),
    }),
    { name: "task-storage" },
  ),
);

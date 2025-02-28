import { create } from "zustand";

interface TaskStore {
  editingTaskId: string | null;
  setEditingTaskId: (editingTaskId: string | null) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  editingTaskId: null,

  setEditingTaskId: (editingTaskId) =>
    set({
      editingTaskId,
    }),
}));

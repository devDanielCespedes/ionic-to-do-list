import { create } from "zustand";

type SnackbarType = "success" | "error" | "info";

interface SnackbarState {
  message: string | null;
  type: SnackbarType;
  setMessage: (message: string, type?: SnackbarType) => void;
  clearMessage: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  type: "info",
  setMessage: (message, type = "info") => set({ message, type }),
  clearMessage: () => set({ message: null }),
}));

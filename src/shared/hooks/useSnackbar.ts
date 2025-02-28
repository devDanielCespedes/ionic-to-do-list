import { useSnackbarStore } from "../store/useSnackbarStore";
import { handleError } from "../utils/handleError";

export function useSnackbar() {
  const { message, type, setMessage, clearMessage } = useSnackbarStore();

  const showError = (error: unknown) => {
    setMessage(handleError(error), "error");
  };

  return { message, type, showError, setMessage, clearMessage };
}

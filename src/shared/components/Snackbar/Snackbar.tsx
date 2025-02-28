import { IonToast } from "@ionic/react";
import { useSnackbar } from "../../hooks/useSnackbar";

export function Snackbar() {
  const { message, type, clearMessage } = useSnackbar();

  const getColor = () => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "danger";
      case "info":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <IonToast
      isOpen={!!message}
      onDidDismiss={clearMessage}
      message={message || undefined}
      duration={3000}
      color={getColor()}
    />
  );
}

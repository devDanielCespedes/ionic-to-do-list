import { IonAlert } from "@ionic/react";
import { AlertValidatorProps } from "./alertValidatorSchema";

export function AlertValidator({
  message: errorMessages,
  onDidDismiss: onClose,
}: AlertValidatorProps) {
  return (
    <IonAlert
      isOpen={true}
      header="Validation Error"
      message={errorMessages}
      buttons={["OK"]}
      onDidDismiss={onClose}
      cssClass="alert-prewrap"
    />
  );
}

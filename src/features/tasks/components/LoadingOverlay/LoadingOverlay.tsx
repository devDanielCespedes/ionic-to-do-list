import { IonSpinner } from "@ionic/react";
import { createPortal } from "react-dom";
import styles from "./LoadingOverlay.module.css";

interface LoadingOverlayProps {
  isOpen: boolean;
}

export function LoadingOverlay({ isOpen }: LoadingOverlayProps) {
  if (!isOpen) return null;
  //https://react.dev/reference/react-dom/createPortal#:~:text=createPortal%20lets%20you%20render%20some%20children%20into%20a%20different%20part%20of%20the%20DOM.
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.spinnerContainer}>
        <IonSpinner name="crescent" className={styles.spinner} />
      </div>
    </div>,
    document.body, // render the overlay in the body of the document
  );
}

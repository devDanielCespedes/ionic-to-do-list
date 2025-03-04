import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";

export function Settings() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* Dark Mode Toggle */}
          <IonItem>
            <ThemeToggle />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

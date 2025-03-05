import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { handleChangeLocale } from "../../../../shared/utils/18nHelpers";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";

export function Settings() {
  const { i18n, t } = useTranslation(["common"]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("settings")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <ThemeToggle />
          </IonItem>

          <IonItem>
            <IonLabel>{t("language")}</IonLabel>
            <IonSelect
              value={i18n.language}
              onIonChange={(e) => handleChangeLocale(e.detail.value)}
            >
              <IonSelectOption value="en">{t("english")}</IonSelectOption>
              <IonSelectOption value="pt">{t("portuguese")}</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

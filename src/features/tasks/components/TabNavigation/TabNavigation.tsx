import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu } from "@ionic/react";
import { archiveOutline, listOutline, settings } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./TabNavigation.module.css";

// TODO: Rename to Desktop Tabs Navigation
export function TabNavigation() {
  const location = useLocation();
  const { t } = useTranslation(["common"]);

  return (
    <IonMenu contentId="main-content" className={styles.desktopTabs}>
      <IonContent>
        <IonList>
          <IonItem
            button
            routerLink="/active"
            className={location.pathname === "/active" ? "menu-active" : ""}
          >
            <IonIcon icon={listOutline} slot="start" />
            <IonLabel>{t("active")}</IonLabel>
            {location.pathname === "/active" && <IonLabel slot="end">&raquo;</IonLabel>}
          </IonItem>
          <IonItem
            button
            routerLink="/archived"
            className={location.pathname === "/archived" ? "menu-active" : ""}
          >
            <IonIcon icon={archiveOutline} slot="start" />
            <IonLabel>{t("archived")}</IonLabel>
            {location.pathname === "/archived" && <IonLabel slot="end">&raquo;</IonLabel>}
          </IonItem>
          <IonItem
            button
            routerLink="/settings"
            className={location.pathname === "/settings" ? "menu-active" : ""}
          >
            <IonIcon icon={settings} slot="start" />
            <IonLabel>{t("settings")}</IonLabel>
            {location.pathname === "/settings" && <IonLabel slot="end">&raquo;</IonLabel>}
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

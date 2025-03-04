import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { Redirect, Route } from "react-router";

import { archiveOutline, listOutline, settings } from "ionicons/icons";
import { ActiveTasks } from "../../pages/ActiveTasks/ActiveTasks";
import { ArchivedTasks } from "../../pages/ArchivedTasks/ArchivedTasks";

import { Settings } from "../../pages/Settings/Settings";
import styles from "./MobileTabNavigation.module.css";

export function MobileTabNavigation() {
  return (
    <IonReactRouter>
      <IonTabs className={styles.mobileTabs}>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/active" />

          <Route path="/active" render={() => <ActiveTasks />} exact={true} />
          <Route path="/archived" render={() => <ArchivedTasks />} exact={true} />
          <Route path="/settings" render={() => <Settings />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="active" href="/active">
            <IonIcon icon={listOutline} />
            <IonLabel>Active</IonLabel>
          </IonTabButton>
          <IonTabButton tab="archived" href="/archived">
            <IonIcon icon={archiveOutline} />
            <IonLabel>Archived</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

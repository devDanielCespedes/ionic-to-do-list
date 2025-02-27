import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { archiveOutline, listOutline } from "ionicons/icons";
import { Redirect, Route, useLocation } from "react-router-dom";

import { ActiveTasks } from "../../pages/ActiveTasks/ActiveTasks";
import { ArchivedTasks } from "../../pages/ArchivedTasks/ArchivedTasks";

export function TabNavigation() {
  const location = useLocation();

  return (
    <IonSplitPane contentId="main-content">
      <IonMenu contentId="main-content">
        <IonContent>
          <IonList>
            <IonItem
              button
              routerLink="/tabs/active"
              className={location.pathname === "/tabs/active" ? "menu-active" : ""}
            >
              <IonIcon icon={listOutline} slot="start" />
              <IonLabel>Active</IonLabel>
              {location.pathname === "/tabs/active" && <IonLabel slot="end">&raquo;</IonLabel>}
            </IonItem>
            <IonItem
              button
              routerLink="/tabs/archived"
              className={location.pathname === "/tabs/archived" ? "menu-active" : ""}
            >
              <IonIcon icon={archiveOutline} slot="start" />
              <IonLabel>Archived</IonLabel>
              {location.pathname === "/tabs/archived" && <IonLabel slot="end">&raquo;</IonLabel>}
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/active" component={ActiveTasks} />
            <Route exact path="/tabs/archived" component={ArchivedTasks} />
            <Route exact path="/" render={() => <Redirect to="/tabs/active" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="mobile-tabs">
            <IonTabButton tab="active" href="/tabs/active">
              <IonIcon icon={listOutline} />
              <IonLabel>Active</IonLabel>
            </IonTabButton>
            <IonTabButton tab="archived" href="/tabs/archived">
              <IonIcon icon={archiveOutline} />
              <IonLabel>Archived</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonPage>
    </IonSplitPane>
  );
}

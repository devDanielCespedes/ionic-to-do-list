import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import "@ionic/react/css/palettes/dark.class.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import { MobileTabNavigation } from "./features/tasks/components/MobileTabNavigation/MobileTabNavigation";
import { TabNavigation } from "./features/tasks/components/TabNavigation/TabNavigation";
import { ActiveTasks } from "./features/tasks/pages/ActiveTasks/ActiveTasks";
import { ArchivedTasks } from "./features/tasks/pages/ArchivedTasks/ArchivedTasks";
import { TestGraphQL } from "./features/tasks/pages/TestGraphQL";
import { Snackbar } from "./shared/components/Snackbar/Snackbar";

setupIonicReact();

export const App = (): JSX.Element => (
  <IonApp>
    <Snackbar />
    <IonReactRouter>
      <IonSplitPane contentId="main-content">
        <TabNavigation />

        <IonRouterOutlet id="main-content">
          <Route exact path="/active" component={ActiveTasks} />
          <Route exact path="/archived" component={ArchivedTasks} />
          <Route exact path="/test" component={TestGraphQL} />
          <Route exact path="/" render={() => <Redirect to="/active" />} />
        </IonRouterOutlet>
      </IonSplitPane>
      <MobileTabNavigation />
    </IonReactRouter>
  </IonApp>
);

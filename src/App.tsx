import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
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
import { TabNavigation } from "./features/tasks/components/TabNavigation/TabNavigation";
import { TestGraphQL } from "./features/tasks/pages/TestGraphQL";
import { Snackbar } from "./shared/components/Snackbar/Snackbar";

import "./theme/variables.css";

setupIonicReact();

export const App = (): JSX.Element => (
  <IonApp>
    <Snackbar />

    <IonReactRouter>
      <IonRouterOutlet id="main">
        <Route path="/tabs" component={TabNavigation} />
        <Route path="/test" component={TestGraphQL} />
        <Route exact path="/" render={() => <Redirect to="/tabs/active" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { ThemeToggle } from "../components/ThemeToggle/ThemeToggle";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonItem>
            <ThemeToggle />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;

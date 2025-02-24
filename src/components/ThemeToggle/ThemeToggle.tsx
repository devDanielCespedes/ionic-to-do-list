import { IonButton, IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import { useTheme } from "../../theme/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <IonButton onClick={toggleTheme}>
      <IonIcon slot="icon-only" icon={isDark ? sunny : moon} />
    </IonButton>
  );
}

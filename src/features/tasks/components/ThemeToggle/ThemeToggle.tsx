import { IonToggle } from "@ionic/react";
import { useTheme } from "../../../../theme/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <IonToggle checked={isDark} onClick={toggleTheme} />
      <span>Dark mode</span>
    </div>
  );
}

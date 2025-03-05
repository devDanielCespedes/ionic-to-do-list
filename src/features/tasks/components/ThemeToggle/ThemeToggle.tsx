import { IonToggle } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../theme/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation(["common"]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <IonToggle checked={isDark} onClick={toggleTheme} />
      <span>{t("darkMode")}</span>
    </div>
  );
}

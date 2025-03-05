import { IonCheckbox, IonLabel } from "@ionic/react";

import { useEnumTranslation } from "../../../../shared/utils/18nHelpers";
import { Priority, PrioritySchema } from "../../shared/schemas";
import styles from "./PriorityCheckbox.module.css";
import { PriorityCheckboxProps } from "./priorityCheckboxSchema";

export const defaultLabels = Object.values(PrioritySchema._def.values).reduce(
  (acc, priority) => {
    acc[priority] = priority;
    return acc;
  },
  {} as Record<Priority, Priority>,
);

export const PriorityCheckbox = ({
  priority,
  selectedPriorities,
  togglePriority,
  label,
}: PriorityCheckboxProps): JSX.Element => {
  const { translatePriority } = useEnumTranslation();
  const displayLabel = label || translatePriority(defaultLabels[priority]);
  const disabled = selectedPriorities.length === 1 && selectedPriorities.includes(priority);
  const checked = selectedPriorities.includes(priority);

  return (
    <div className={styles.container}>
      <IonCheckbox
        disabled={disabled}
        checked={checked}
        onIonChange={(e) => togglePriority(priority, e.detail.checked)}
      />
      <IonLabel>{displayLabel}</IonLabel>
    </div>
  );
};

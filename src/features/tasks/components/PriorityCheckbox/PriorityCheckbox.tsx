import { IonCheckbox, IonLabel } from "@ionic/react";

import { CapitalizeWords, capitalizeWords } from "../../../../shared/utils/stringUtils";
import { Priority, PrioritySchema, Task } from "../../shared/schemas";
import styles from "./PriorityCheckbox.module.css";
import { PriorityCheckboxProps } from "./priorityCheckboxSchema";

export const defaultLabels = PrioritySchema.options.reduce(
  (acc, priority) => {
    acc[priority] = capitalizeWords(priority);
    return acc;
  },
  {} as Record<Priority, CapitalizeWords<Task["priority"]>>,
);

export const PriorityCheckbox = ({
  priority,
  selectedPriorities,
  togglePriority,
  label,
}: PriorityCheckboxProps): JSX.Element => {
  const displayLabel = label || defaultLabels[priority];
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

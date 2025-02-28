import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { PriorityCheckbox } from "../PriorityCheckbox/PriorityCheckbox";

import { z } from "zod";
import { PrioritySchema, TaskStatusSchema } from "../../shared/schemas";
import styles from "./TaskFilter.module.css";

export const taskFilterPropsSchema = z.object({
  selectedStatuses: z.array(TaskStatusSchema),
  toggleStatus: z.function().args(TaskStatusSchema, z.boolean()).returns(z.void()),
  selectedPriorities: z.array(PrioritySchema),
  togglePriority: z.function().args(PrioritySchema, z.boolean()).returns(z.void()),
  toggleAll: z.function().args(z.boolean()).returns(z.void()),
  isAllSelected: z.boolean(),
});

export type TaskFilterProps = z.infer<typeof taskFilterPropsSchema>;

export const TaskFilter = ({
  selectedStatuses,
  toggleStatus,
  selectedPriorities,
  togglePriority,
  toggleAll,
  isAllSelected,
}: TaskFilterProps) => {
  return (
    <IonItem lines="none">
      <div className={styles.container}>
        <div className={styles.checkboxContainer}>
          <IonCheckbox
            checked={isAllSelected}
            onIonChange={(e) => toggleAll(e.detail.checked)}
            disabled={isAllSelected}
          />
          <IonLabel>All</IonLabel>
        </div>

        <div className={styles.checkboxContainer}>
          <IonCheckbox
            checked={selectedStatuses.includes(TaskStatusSchema.Enum.completed)}
            onIonChange={(e) => toggleStatus(TaskStatusSchema.Enum.completed, e.detail.checked)}
            disabled={
              selectedStatuses.length === 1 &&
              selectedStatuses.includes(TaskStatusSchema.Enum.completed)
            }
          />
          <IonLabel>Done</IonLabel>
        </div>
        <div className={styles.checkboxContainer}>
          <IonCheckbox
            checked={selectedStatuses.includes(TaskStatusSchema.Enum.incomplete)}
            onIonChange={(e) => toggleStatus(TaskStatusSchema.Enum.incomplete, e.detail.checked)}
            disabled={
              selectedStatuses.length === 1 &&
              selectedStatuses.includes(TaskStatusSchema.Enum.incomplete)
            }
          />
          <IonLabel>To Do</IonLabel>
        </div>
        {Object.values(PrioritySchema._def.values).map((priority) => (
          <PriorityCheckbox
            key={priority}
            priority={priority}
            selectedPriorities={selectedPriorities}
            togglePriority={togglePriority}
          />
        ))}
      </div>
    </IonItem>
  );
};

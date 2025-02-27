import {
  IonActionSheet,
  IonBadge,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  archiveOutline,
  closeOutline,
  ellipsisHorizontal,
  eyeOutline,
  pencilOutline,
  returnUpBackOutline,
  trashOutline,
} from "ionicons/icons";
import { useCallback, useMemo, useState } from "react";

import { useIsMobile } from "../../../../shared/hooks/useIsMobile";
import { Task } from "../../shared/schemas";
import "./TodoItem.css";

interface TodoItemProps {
  task: Task;
  onToggleDone?: (id: string) => void;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isArchived?: boolean;
}

export function TodoItem({
  task,
  onToggleDone,
  onArchive,
  onRestore,
  onDelete,
  onEdit,
  isArchived,
}: TodoItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const isMobile = useIsMobile();

  const getBadgeData = (done: boolean, priority: Task["priority"]) => {
    if (done) return { text: "DONE", color: "success" };
    return {
      text: priority.toUpperCase(),
      color: priority === "high" ? "danger" : priority === "medium" ? "warning" : "primary",
    };
  };

  const { text, color } = getBadgeData(task.done, task.priority);

  const priorityClass =
    task.priority === "high"
      ? "badge-high"
      : task.priority === "medium"
        ? "badge-medium"
        : "badge-low";

  const handleOnDelete = useCallback(() => onDelete(task.id), [onDelete, task.id]);
  const handleArchive = useCallback(() => onArchive && onArchive(task.id), [onArchive, task.id]);
  const handleRestore = useCallback(() => onRestore && onRestore(task.id), [onRestore, task.id]);
  const handleEdit = useCallback(() => onEdit(task), [onEdit, task]);

  const actionSheetButtons = useMemo(
    () => [
      {
        text: "Details",
        icon: eyeOutline,
        handler: () => setShowDetails(true),
      },
      ...(isArchived
        ? [
            {
              text: "Restore",
              icon: returnUpBackOutline,
              handler: handleRestore,
            },
            {
              text: "Delete",
              icon: trashOutline,
              role: "destructive",
              handler: handleOnDelete,
            },
          ]
        : [
            {
              text: "Edit",
              icon: pencilOutline,
              handler: handleEdit,
            },
            {
              text: "Archive",
              icon: archiveOutline,
              handler: () => onArchive && onArchive(task.id),
            },
            {
              text: "Delete",
              icon: trashOutline,
              role: "destructive",
              handler: handleOnDelete,
            },
          ]),
      {
        text: "Cancel",
        icon: closeOutline,
        role: "cancel",
      },
    ],
    [isArchived, task, onEdit, onArchive, onRestore, onDelete, setShowDetails],
  );

  const handleToggleDone = useCallback(() => {
    () => {
      if (!isArchived && onToggleDone) {
        onToggleDone(task.id);
      }
    };
  }, [isArchived, onToggleDone, task.id]);

  return (
    <>
      <IonItem className="todo-item">
        {!isArchived && onToggleDone && (
          <IonCheckbox
            slot="start"
            checked={task.done}
            onIonChange={handleToggleDone}
            id={`checkbox-${task.id}`}
          />
        )}

        <IonLabel
          onClick={onToggleDone ? handleToggleDone : undefined}
          className={`${task.done ? "task-done" : ""} ${!isArchived ? "task-label-pointer" : ""}`}
        >
          {task.title}
        </IonLabel>

        <IonBadge
          slot="end"
          color={color}
          className={`${!isArchived ? "badge-clickable" : ""} ${priorityClass}`}
          onClick={handleToggleDone}
        >
          {text}
        </IonBadge>

        {isMobile ? (
          <IonButton fill="outline" slot="end" onClick={() => setShowActionSheet(true)}>
            <IonIcon icon={ellipsisHorizontal} />
          </IonButton>
        ) : (
          <>
            <IonButton fill="outline" slot="end" onClick={() => setShowDetails(true)}>
              <IonIcon icon={eyeOutline} />
            </IonButton>

            {!isArchived && (
              <IonButton fill="outline" slot="end" onClick={handleEdit}>
                <IonIcon icon={pencilOutline} />
              </IonButton>
            )}

            {!isArchived ? (
              <>
                <IonButton color="medium" fill="clear" slot="end" onClick={handleArchive}>
                  <IonIcon icon={archiveOutline} />
                </IonButton>
                <IonButton color="danger" fill="clear" slot="end" onClick={handleOnDelete}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </>
            ) : (
              <>
                <IonButton color="primary" fill="clear" slot="end" onClick={handleRestore}>
                  <IonIcon icon={returnUpBackOutline} />
                </IonButton>
                <IonButton color="danger" fill="clear" slot="end" onClick={handleOnDelete}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </>
            )}
          </>
        )}
      </IonItem>

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />

      <IonModal isOpen={showDetails} onDidDismiss={() => setShowDetails(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Task Details</IonTitle>
            <IonButton slot="end" fill="clear" onClick={() => setShowDetails(false)}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>{task.title}</h2>
          <IonBadge color={color} className={priorityClass}>
            {text}
          </IonBadge>
          <p className="todo-item-description">{task.description || "No description available."}</p>
        </IonContent>
      </IonModal>
    </>
  );
}

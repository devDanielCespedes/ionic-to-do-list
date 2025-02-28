import {
  IonActionSheet,
  IonAlert,
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

import {
  useDeleteTaskMutation,
  useToggleTaskArchivedMutation,
  useToggleTaskDoneMutation,
} from "../../../../graphql/generated";
import { GET_TASKS } from "../../../../graphql/queries";
import { useIsMobile } from "../../../../shared/hooks/useIsMobile";
import { useSnackbar } from "../../../../shared/hooks/useSnackbar";
import { PrioritySchema, Task } from "../../shared/schemas";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import "./TodoItem.css";

interface TodoItemProps {
  task: Task;
  onEdit: (taskId: Task["id"]) => void;
  isArchived?: boolean;
}

export function TodoItem({ task, onEdit, isArchived }: TodoItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [deleteTask, { loading: deleteTaskLoading }] = useDeleteTaskMutation({
    refetchQueries: [{ query: GET_TASKS }],
  });

  const [toggleTaskDone, { loading: toggleTaskDoneLoading }] = useToggleTaskDoneMutation({
    refetchQueries: [{ query: GET_TASKS }],
  });

  const [toggleTaskArchived, { loading: toggleTaskArchivedLoading }] =
    useToggleTaskArchivedMutation({
      refetchQueries: [{ query: GET_TASKS }],
    });

  const isLoading = deleteTaskLoading || toggleTaskDoneLoading || toggleTaskArchivedLoading;

  const { showError, clearMessage, setMessage } = useSnackbar();

  const isMobile = useIsMobile();

  const getBadgeData = (done: boolean, priority: Task["priority"]) => {
    if (done) return { text: "DONE", color: "success" };
    return {
      text: priority.toUpperCase(),
      color:
        priority === PrioritySchema.enum.High
          ? "danger"
          : priority === PrioritySchema.enum.Medium
            ? "warning"
            : "primary",
    };
  };

  const { text, color } = getBadgeData(task?.done ?? false, task.priority);

  const priorityClass =
    task.priority === PrioritySchema.enum.High
      ? "badge-high"
      : task.priority === PrioritySchema.enum.Medium
        ? "badge-medium"
        : "badge-low";

  const handleOnDelete = useCallback(async () => {
    clearMessage();

    try {
      const { errors } = await deleteTask({ variables: { id: task.id } });

      if (errors && errors.length > 0) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }

      setMessage("Task deleted successfully", "success");
    } catch (error) {
      console.error("Captured error in TodoForms:", error);
      showError(error);
    }
  }, [deleteTask, task.id]);

  const handleToggleDone = useCallback(async () => {
    clearMessage();

    try {
      const { errors } = await toggleTaskDone({
        variables: { id: task.id },
      });

      if (errors && errors.length > 0) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }

      setMessage(`Task ${task.done ? "undone" : "done"} successfully`, "success");
    } catch (error) {
      console.error("Captured error in TodoForms:", error);
      showError(error);
    }
  }, [toggleTaskDone, task.id, task.done]);

  const handleArchive = useCallback(async () => {
    clearMessage();

    try {
      const { errors } = await toggleTaskArchived({
        variables: { id: task.id },
      });

      if (errors && errors.length > 0) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }

      setMessage(`Task ${isArchived ? "restored" : "archived"} successfully`, "success");
    } catch (error) {
      console.error("Captured error in TodoForms:", error);
      showError(error);
    }
  }, [toggleTaskArchived, task.id]);

  const handleDeleteConfirm = () => {
    setShowDeleteAlert(true);
  };

  const handleEdit = useCallback(() => onEdit(task.id), [onEdit, task.id]);

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
              handler: handleArchive,
            },
            {
              text: "Delete",
              icon: trashOutline,
              role: "destructive",
              handler: handleDeleteConfirm,
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
              handler: handleArchive,
            },
            {
              text: "Delete",
              icon: trashOutline,
              role: "destructive",
              handler: handleDeleteConfirm,
            },
          ]),
      {
        text: "Cancel",
        icon: closeOutline,
        role: "cancel",
      },
    ],
    [handleArchive, handleDeleteConfirm, handleEdit, isArchived],
  );

  return (
    <>
      <LoadingOverlay isOpen={isLoading} />
      <IonItem className="todo-item">
        {!isArchived && (
          <IonCheckbox
            slot="start"
            checked={task.done}
            onIonChange={handleToggleDone}
            id={`checkbox-${task.id}`}
          />
        )}

        <IonLabel
          onClick={handleToggleDone}
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
                <IonButton color="danger" fill="clear" slot="end" onClick={handleDeleteConfirm}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </>
            ) : (
              <>
                <IonButton color="primary" fill="clear" slot="end" onClick={handleArchive}>
                  <IonIcon icon={returnUpBackOutline} />
                </IonButton>
                <IonButton color="danger" fill="clear" slot="end" onClick={handleDeleteConfirm}>
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

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={"Confirm Delete"}
        message={"Are you sure you want to delete this task?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: "Delete",
            role: "destructive",
            handler: handleOnDelete,
          },
        ]}
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

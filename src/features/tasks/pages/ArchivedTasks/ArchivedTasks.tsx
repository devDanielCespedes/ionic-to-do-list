import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAllTasksQuery } from "../../../../graphql/generated";
import { useIsMobile } from "../../../../shared/hooks/useIsMobile";
import { TaskFilter } from "../../components/TaskFilter/TaskFilter";
import { TodoList } from "../../components/TodoList/TodoList";
import { Priority, PrioritySchema, Task, TaskStatus, TaskStatusSchema } from "../../shared/schemas";

export function ArchivedTasks() {
  const { data, loading } = useGetAllTasksQuery();
  const { t } = useTranslation(["task", "common"]);

  const tasks: Omit<Task, "createdAt">[] | undefined = useMemo(
    () =>
      data?.getAllTasks
        ?.filter((task) => task?.archived)
        .map((task) => ({
          id: task?.id || "",
          title: task?.title || "",
          description: task?.description || "",
          priority: task?.priority || PrioritySchema.enum.Low,
          done: task?.done || false,
          archived: task?.archived || false,
        })),
    [data],
  );

  const [selectedStatuses, setSelectedStatuses] = useState<Array<TaskStatus>>(
    TaskStatusSchema.options.map((s) => s),
  );
  const [selectedPriorities, setSelectedPriorities] = useState<Array<Priority>>(
    Object.values(PrioritySchema._def.values).map((p) => p),
  );

  const isMobile = useIsMobile();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleStatus = useCallback(
    (status: TaskStatus, checked: boolean) => {
      setSelectedStatuses((prev) => {
        if (checked) {
          return prev.includes(status) ? prev : [...prev, status];
        } else {
          const newSelected = prev.filter((s) => s !== status);
          return newSelected.length === 0 ? prev : newSelected;
        }
      });
    },
    [setSelectedStatuses],
  );

  const togglePriority = useCallback((priority: Priority, checked: boolean) => {
    setSelectedPriorities((prev) => {
      if (checked) {
        return prev.includes(priority) ? prev : [...prev, priority];
      } else {
        const newSelected = prev.filter((p) => p !== priority);
        return newSelected.length === 0 ? prev : newSelected;
      }
    });
  }, []);

  const isAllSelected = selectedStatuses.length === 2 && selectedPriorities.length === 3;

  const toggleAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedStatuses(TaskStatusSchema.options.map((s) => s));
      setSelectedPriorities(Object.values(PrioritySchema._def.values).map((p) => p));
    }
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task: Task) => {
      const matchesStatus =
        selectedStatuses.length === 2 ||
        (selectedStatuses.includes(TaskStatusSchema.Enum.completed) && task.done) ||
        (selectedStatuses.includes(TaskStatusSchema.Enum.incomplete) && !task.done);

      const matchesPriority = selectedPriorities.includes(task.priority);
      return matchesStatus && matchesPriority;
    });
  }, [tasks, selectedStatuses, selectedPriorities]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("archivedTasks")}</IonTitle>
          {isMobile && (
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterModal(true)}>{t("common:filter")}</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!isMobile && (
          <TaskFilter
            selectedStatuses={selectedStatuses}
            toggleStatus={toggleStatus}
            selectedPriorities={selectedPriorities}
            togglePriority={togglePriority}
            toggleAll={toggleAll}
            isAllSelected={isAllSelected}
          />
        )}

        <IonModal isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{t("common:filter")}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowFilterModal(false)}>{t("common:close")}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <TaskFilter
              selectedStatuses={selectedStatuses}
              toggleStatus={toggleStatus}
              selectedPriorities={selectedPriorities}
              togglePriority={togglePriority}
              toggleAll={toggleAll}
              isAllSelected={isAllSelected}
            />
          </IonContent>
        </IonModal>

        <TodoList tasks={filteredTasks || []} isArchived />
      </IonContent>
    </IonPage>
  );
}

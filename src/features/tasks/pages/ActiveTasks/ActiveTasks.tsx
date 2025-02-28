import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useMemo, useState } from "react";

import { useIsMobile } from "../../../../shared/hooks/useIsMobile";
import { TaskFilter } from "../../components/TaskFilter/TaskFilter";
import { TodoForms } from "../../components/TodoForms/TodoForms";
import { TodoList } from "../../components/TodoList/TodoList";
import { Priority, PrioritySchema, Task, TaskStatus, TaskStatusSchema } from "../../shared/schemas";

import { useGetAllTasksQuery } from "../../../../graphql/generated";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import "./ActiveTasks.css";

export function ActiveTasks() {
  // const { tasks } = useTaskStore();
  const isMobile = useIsMobile();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = useState<Array<TaskStatus>>(
    TaskStatusSchema.options.map((s) => s),
  );

  const [selectedPriorities, setSelectedPriorities] = useState<Array<Priority>>(
    Object.values(PrioritySchema._def.values).map((p) => p),
  );

  const { data, loading } = useGetAllTasksQuery();

  const tasks: Omit<Task, "createdAt">[] | undefined = data?.getAllTasks
    ?.filter((task) => !task?.archived)
    .map((task) => ({
      id: task?.id || "",
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || PrioritySchema.enum.Low,
      done: task?.done || false,
      archived: task?.archived || false,
    }));

  const toggleStatus = useCallback((status: TaskStatus, checked: boolean) => {
    setSelectedStatuses((prev) => {
      if (checked) {
        return prev.includes(status) ? prev : [...prev, status];
      } else {
        const newSelected = prev.filter((s) => s !== status);
        return newSelected.length === 0 ? prev : newSelected;
      }
    });
  }, []);

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

  const toggleAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedStatuses(TaskStatusSchema.options.map((s) => s));
      setSelectedPriorities(Object.values(PrioritySchema._def.values).map((p) => p));
    }
  }, []);

  const filteredTasks = useMemo(() => {
    return (tasks ?? []).filter((task): task is Task => {
      if (!task) {
        return false;
      }

      const matchesStatus =
        selectedStatuses.length === 2
          ? true
          : selectedStatuses.includes(TaskStatusSchema.Enum.completed)
            ? task.done
            : !task.done;

      const matchesPriority =
        task.priority !== undefined && selectedPriorities.includes(task.priority);

      return matchesStatus && matchesPriority;
    });
  }, [tasks, selectedStatuses, selectedPriorities]);

  const isAllSelected =
    TaskStatusSchema.options.length === selectedStatuses.length &&
    Object.values(PrioritySchema._def.values).length === selectedPriorities.length;

  return (
    <IonPage>
      <LoadingOverlay isOpen={loading} />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Active Tasks</IonTitle>
          {isMobile && (
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterModal(true)}>Filters</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard className="todo-forms">
          <IonCardContent>
            <TodoForms />
          </IonCardContent>
        </IonCard>

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
              <IonTitle>Filters</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowFilterModal(false)}>Close</IonButton>
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

        <TodoList tasks={filteredTasks} />
      </IonContent>
    </IonPage>
  );
}

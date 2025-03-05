import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { useEnumTranslation } from "../../../../shared/utils/18nHelpers";
import { PrioritySchema, Task } from "../../shared/schemas";
import { useTaskStore } from "../../store/taskStore";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import { TodoItem } from "../TodoItem/TodoItem";

interface PrioritySectionProps {
  title: string;
  tasks: Task[];
  emptyMessage?: string;
  onEdit: (taskId: string) => void;
  isArchived?: boolean;
}

export function PrioritySection({
  title,
  tasks,
  emptyMessage,
  isArchived,
  onEdit,
}: PrioritySectionProps): JSX.Element {
  return (
    <>
      <IonListHeader>{title}</IonListHeader>
      {tasks.length === 0 && (
        <IonItem>
          <IonLabel>{emptyMessage || "No tasks."}</IonLabel>
        </IonItem>
      )}
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} isArchived={isArchived} onEdit={onEdit} />
      ))}
    </>
  );
}

interface TodoListProps {
  tasks: Task[];
  isArchived?: boolean;
}

export function TodoList({ tasks, isArchived }: TodoListProps) {
  const { setEditingTaskId, editingTaskId } = useTaskStore();
  const { translatePriority } = useEnumTranslation();
  const { t } = useTranslation(["task", "common"]);

  const prioritySections = useMemo(() => {
    return Object.values(PrioritySchema._def.values).map((priority) => {
      const tasksForPriority = tasks.filter((task) => task.priority === priority);
      return { priority, tasks: tasksForPriority };
    });
  }, [tasks]);

  const editingTaskIdBool = !!editingTaskId;

  const currentTaskEditing = useMemo(() => {
    return tasks.find((task) => task.id === editingTaskId);
  }, [tasks, editingTaskId]);

  return (
    <>
      <IonList>
        {prioritySections.map(({ priority, tasks }) => (
          <PrioritySection
            key={priority}
            title={translatePriority(priority)}
            tasks={tasks}
            emptyMessage={t("NoPriorityTasks", { priority: translatePriority(priority) })}
            isArchived={isArchived}
            onEdit={setEditingTaskId}
          />
        ))}
      </IonList>

      {!!editingTaskIdBool && (
        <EditTaskModal
          isOpen={!!editingTaskIdBool}
          onClose={() => setEditingTaskId(null)}
          task={currentTaskEditing}
        />
      )}
    </>
  );
}

import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useMemo } from "react";

import { capitalizeWords } from "../../../../shared/utils/stringUtils";
import { PrioritySchema, Task } from "../../shared/schemas";
import { useTaskStore } from "../../store/taskStore";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import { TodoItem } from "../TodoItem/TodoItem";

interface PrioritySectionProps {
  title: string;
  tasks: Task[];
  emptyMessage?: string;
  onToggleDone?: (id: string) => void;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isArchived?: boolean;
}

export function PrioritySection({
  title,
  tasks,
  emptyMessage,
  isArchived,
  onToggleDone,
  onArchive,
  onRestore,
  onDelete,
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
        <TodoItem
          key={task.id}
          task={task}
          isArchived={isArchived}
          onToggleDone={onToggleDone}
          onArchive={onArchive}
          onRestore={onRestore}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

interface TodoListProps {
  tasks: Task[];
  isArchived?: boolean;
}

export function TodoList({ tasks, isArchived }: TodoListProps) {
  const {
    toggleTaskDone,
    archiveTask,
    restoreTask,
    deleteTask,
    updateTask,
    editingTask,
    setEditingTask,
    clearEditingTask,
  } = useTaskStore();

  const prioritySections = useMemo(() => {
    return PrioritySchema.options.map((priority) => {
      const tasksForPriority = tasks.filter((task) => task.priority === priority);
      return { priority, tasks: tasksForPriority };
    });
  }, [tasks]);

  return (
    <>
      <IonList>
        {prioritySections.map(({ priority, tasks }) => (
          <PrioritySection
            key={priority}
            title={`${capitalizeWords(priority)} Priority`}
            tasks={tasks}
            emptyMessage={`No ${capitalizeWords(priority)} priority tasks.`}
            isArchived={isArchived}
            onToggleDone={!isArchived ? toggleTaskDone : undefined}
            onArchive={!isArchived ? archiveTask : undefined}
            onRestore={isArchived ? restoreTask : undefined}
            onDelete={deleteTask}
            onEdit={setEditingTask}
          />
        ))}
      </IonList>

      {editingTask && (
        <EditTaskModal
          isOpen={!!editingTask}
          onClose={clearEditingTask}
          task={editingTask}
          onSave={updateTask}
        />
      )}
    </>
  );
}

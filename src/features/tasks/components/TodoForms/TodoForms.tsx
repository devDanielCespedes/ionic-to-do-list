import { zodResolver } from "@hookform/resolvers/zod";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { useIsMobile } from "../../../../shared/hooks/useIsMobile";

import { PrioritySchema, Task, TaskSchema, TITLE_MAX_LENGTH } from "../../shared/schemas";
import { useTaskStore } from "../../store/taskStore";

const TaskFormSchema = TaskSchema.omit({ id: true, done: true });

export function TodoForms() {
  const addTask = useTaskStore((state) => state.addTask);
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<Task, "id" | "done">>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: PrioritySchema.Enum.low,
    },
  });

  const watchedTitle = watch("title", "");

  const onSubmit = (data: Omit<Task, "id" | "done">) => {
    addTask({ ...data, done: false });
    reset();
  };

  return (
    <IonGrid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonRow>
          <IonCol size="12" sizeLg="3" sizeXl="1">
            <IonItem>
              <IonLabel position="stacked">Priority</IonLabel>
              <IonSelect {...register("priority")}>
                {PrioritySchema.options.map((priority) => (
                  <IonSelectOption key={priority} value={priority}>
                    {priority}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {errors.priority && <IonNote color="danger">{errors.priority.message}</IonNote>}
          </IonCol>
          <IonCol size="12" sizeLg="9">
            <IonItem>
              <IonLabel position="stacked">
                Title ({watchedTitle?.length ?? 0}/{TITLE_MAX_LENGTH})
              </IonLabel>
              <IonInput
                {...register("title")}
                onIonInput={(e) => {
                  const newTitle = e.detail.value?.slice(0, TITLE_MAX_LENGTH) ?? "";
                  setValue("title", newTitle, { shouldValidate: true });
                }}
                maxlength={TITLE_MAX_LENGTH}
                placeholder="Task title"
              />
            </IonItem>
            {errors.title && <IonNote color="danger">{errors.title.message}</IonNote>}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea {...register("description")} rows={isMobile ? 1 : 3} />
            </IonItem>
            {errors.description && <IonNote color="danger">{errors.description.message}</IonNote>}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton expand="block" type="submit">
              Add Task
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}

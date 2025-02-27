import { zodResolver } from "@hookform/resolvers/zod";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { PrioritySchema, Task, TaskSchema, TITLE_MAX_LENGTH } from "../../shared/schemas";
import { AlertValidator } from "../AlertValidator/AlertValidator";
import { EditTaskModalProps, EditTaskModalPropsSchema } from "./editTaskModalSchema";

export function EditTaskModal(props: EditTaskModalProps) {
  const safeParseResponse = EditTaskModalPropsSchema.safeParse(props);

  if (!safeParseResponse.success) {
    const errorMessages = safeParseResponse.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");

    return <AlertValidator message={errorMessages} onDidDismiss={props.onClose} />;
  }

  const { isOpen, onClose, task, onSave } = props;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: task,
  });

  const watchTitle = watch("title", "");

  const onSubmit = (data: Task) => {
    onSave({ ...task, ...data });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      reset(task);
    }
  }, [isOpen, task, reset]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">
            Title ({watchTitle?.length ?? 0}/{TITLE_MAX_LENGTH})
          </IonLabel>
          <IonInput
            className={`${!errors?.title?.message && "ion-valid"} ${errors?.title?.message && "ion-invalid"} `}
            {...register("title")}
            value={watchTitle}
            onIonInput={(e) => {
              const newTitle = e.detail.value?.slice(0, TITLE_MAX_LENGTH) ?? "";
              setValue("title", newTitle, { shouldValidate: true });
            }}
            maxlength={TITLE_MAX_LENGTH}
            placeholder="Task title"
          />
        </IonItem>
        {errors.title && <IonText color="danger">{errors.title.message}</IonText>}

        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea {...register("description")} placeholder="Task description" rows={15} />
        </IonItem>
        {errors.description && <IonText color="danger">{errors.description.message}</IonText>}

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
        {errors.priority && <IonText color="danger">{errors.priority.message}</IonText>}

        <IonButton expand="block" type="submit">
          Save Changes
        </IonButton>
        <IonButton expand="block" color="danger" onClick={onClose}>
          Cancel
        </IonButton>
      </form>
    </IonModal>
  );
}

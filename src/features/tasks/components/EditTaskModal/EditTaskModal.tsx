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

import { useTranslation } from "react-i18next";
import { useUpdateTaskMutation } from "../../../../graphql/generated";
import { GET_TASKS } from "../../../../graphql/queries";
import { useSnackbar } from "../../../../shared/hooks/useSnackbar";
import { useEnumTranslation } from "../../../../shared/utils/18nHelpers";
import { PrioritySchema, Task, TITLE_MAX_LENGTH } from "../../shared/schemas";
import { AlertValidator } from "../AlertValidator/AlertValidator";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import {
  EditTaskModalProps,
  useEditTaskModalPropsSchema,
  useUpdateTaskInputSchema,
} from "./editTaskModalSchema";

export function EditTaskModal(props: EditTaskModalProps) {
  const updateTaskInputSchema = useUpdateTaskInputSchema();
  const EditTaskModalPropsSchema = useEditTaskModalPropsSchema();
  const safeParseResponse = EditTaskModalPropsSchema.safeParse(props);

  if (!safeParseResponse.success) {
    const errorMessages = safeParseResponse.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");

    return <AlertValidator message={errorMessages} onDidDismiss={props.onClose} />;
  }

  const { isOpen, onClose, task } = props;

  const { t } = useTranslation(["task", "common"]);
  const { translatePriority } = useEnumTranslation();

  const [updateTask, { loading: updateTaskLoading }] = useUpdateTaskMutation({
    refetchQueries: [{ query: GET_TASKS }],
  });
  const { clearMessage, showError, setMessage } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(updateTaskInputSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? PrioritySchema.enum.Low,
    },
  });

  const watchTitle = watch("title", "");

  const onSubmit = async (data: Task) => {
    clearMessage();

    try {
      const { errors } = await updateTask({
        variables: {
          ...data,
          id: task?.id ?? "",
        },
      });

      if (errors && errors.length > 0) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }
      setMessage(t("task:taskUpdatedSuccess"), "success");
      reset();
      onClose();
    } catch (error) {
      console.error(t("task:errorUpdatingTask"), error);
      showError(`${t("task:errorUpdatingTask")} ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset(task);
    }
  }, [isOpen, task, reset]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <LoadingOverlay isOpen={updateTaskLoading} />
      <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">
            {t("task:taskTitle")} ({watchTitle?.length ?? 0}/{TITLE_MAX_LENGTH})
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
            placeholder={t("task:taskTitle")}
          />
        </IonItem>
        {errors.title && <IonText color="danger">{errors.title.message}</IonText>}

        <IonItem>
          <IonLabel position="stacked">{t("task:taskDescription")}</IonLabel>
          <IonTextarea
            {...register("description")}
            placeholder={t("task:taskDescription")}
            rows={15}
          />
        </IonItem>
        {errors.description && <IonText color="danger">{errors.description.message}</IonText>}

        <IonItem>
          <IonLabel position="stacked">{t("taskPriority")}</IonLabel>
          <IonSelect {...register("priority")}>
            {Object.values(PrioritySchema._def.values).map((priority) => (
              <IonSelectOption key={priority} value={priority}>
                {translatePriority(priority)}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        {errors.priority && <IonText color="danger">{errors.priority.message}</IonText>}

        <IonButton expand="block" type="submit">
          {t("common:save")}
        </IonButton>
        <IonButton expand="block" color="danger" onClick={onClose}>
          {t("common:cancel")}
        </IonButton>
      </form>
    </IonModal>
  );
}

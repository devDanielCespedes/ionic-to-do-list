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

import { useTranslation } from "react-i18next";
import { useCreateTaskMutation } from "../../../../graphql/generated";
import { GET_TASKS } from "../../../../graphql/queries";
import { useSnackbar } from "../../../../shared/hooks/useSnackbar";
import { useEnumTranslation } from "../../../../shared/utils/18nHelpers";
import { PrioritySchema, Task, TITLE_MAX_LENGTH } from "../../shared/schemas";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import { useTaskFormSInputSchema } from "./todoFormsSchema";

export function TodoForms() {
  const isMobile = useIsMobile();

  const [createTask, { loading }] = useCreateTaskMutation({
    refetchQueries: [{ query: GET_TASKS }],
  });

  const TaskFormSInputSchema = useTaskFormSInputSchema();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<Task, "id" | "done" | "createdAt" | "updatedAt">>({
    resolver: zodResolver(TaskFormSInputSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: PrioritySchema.enum.Low,
    },
  });

  const { showError, clearMessage, setMessage } = useSnackbar();

  const watchedTitle = watch("title", "");

  const { t } = useTranslation(["task", "common"]);
  const { translatePriority } = useEnumTranslation();

  const onSubmit = async (data: Omit<Task, "id" | "done" | "createdAt" | "updatedAt">) => {
    clearMessage();

    try {
      const { errors } = await createTask({ variables: data });

      if (errors && errors.length > 0) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }
      setMessage(t("task:createTaskSuccess"), "success");
      reset();
    } catch (error) {
      console.error(t("task:errorCreatingTask"), error);
      showError(`${t("task:errorCreatingTask")}: ${(error as Error).message}`);
    }
  };

  return (
    <>
      <LoadingOverlay isOpen={loading} />
      <IonGrid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonRow>
            <IonCol size="12" sizeLg="3">
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
              {errors.priority && <IonNote color="danger">{errors.priority.message}</IonNote>}
            </IonCol>
            <IonCol size="12" sizeLg="9">
              <IonItem>
                <IonLabel position="stacked">
                  {t("task:taskTitle")} ({watchedTitle?.length ?? 0}/{TITLE_MAX_LENGTH})
                </IonLabel>
                <IonInput
                  {...register("title")}
                  onIonInput={(e) => {
                    const newTitle = e.detail.value?.slice(0, TITLE_MAX_LENGTH) ?? "";
                    setValue("title", newTitle, { shouldValidate: true });
                  }}
                  maxlength={TITLE_MAX_LENGTH}
                  placeholder={t("task:taskTitle")}
                />
              </IonItem>
              {errors.title && <IonNote color="danger">{errors.title.message}</IonNote>}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">{t("task:taskDescription")}</IonLabel>
                <IonTextarea {...register("description")} rows={isMobile ? 1 : 3} />
              </IonItem>
              {errors.description && <IonNote color="danger">{errors.description.message}</IonNote>}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" type="submit">
                {t("task:createTask")}
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonGrid>
    </>
  );
}

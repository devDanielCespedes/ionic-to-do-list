import { useTranslation } from "react-i18next";
import { Priority, TaskStatus } from "../../features/tasks/shared/schemas";
import Resources from "../../lib/locales/@types/resources";
import i18n from "../../lib/locales/i18n";

export const useEnumTranslation = () => {
  const { t } = useTranslation(["task"]);

  const translatePriority = (priority: Priority) => t(`priority.${priority}`);
  const translateStatus = (status: TaskStatus) => t(`status.${status}`);

  return { translatePriority, translateStatus };
};

export const handleChangeLocale = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem("ionic-todo-list-language", language);
};

export const useTasksZodErrorTranslation = () => {
  const { t } = useTranslation("task");

  const translateError = <K extends keyof Resources["task"]["errors"]>(
    key: K,
    values?: Record<string, string | number>,
  ): string => {
    return t(`errors.${key}`, "", values ? { ...values } : {});
  };

  return { translateError };
};

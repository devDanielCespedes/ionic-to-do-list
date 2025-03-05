import z from "zod";
import { Priority as GraphqlPriority } from "../../../graphql/generated";
import { useTasksZodErrorTranslation } from "../../../shared/utils/18nHelpers";

export const TaskStatusSchema = z.enum(["completed", "incomplete"]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const PrioritySchema = z.nativeEnum(GraphqlPriority);

export type Priority = z.infer<typeof PrioritySchema>;

export const TITLE_MAX_LENGTH = 150;

export const TITLE_MIN_LENGTH = 5;

export const useTaskSchema = () => {
  const { translateError } = useTasksZodErrorTranslation();

  return z.object({
    id: z.string(),
    title: z
      .string()
      .min(5, { message: translateError("titleMin", { min: 5 }) })
      .max(TITLE_MAX_LENGTH, {
        message: translateError("titleMax", { max: TITLE_MAX_LENGTH }),
      }),
    description: z.string(),
    priority: PrioritySchema,
    done: z.boolean().optional(),
    archived: z.boolean().optional(),
  });
};

export type Task = z.infer<ReturnType<typeof useTaskSchema>>;

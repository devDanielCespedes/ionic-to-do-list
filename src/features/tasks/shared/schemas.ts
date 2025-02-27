import z from "zod";

export const TaskStatusSchema = z.enum(["completed", "incomplete"]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const PrioritySchema = z.enum(["low", "medium", "high"]);

export type Priority = z.infer<typeof PrioritySchema>;

export const TITLE_MAX_LENGTH = 150;

export const TaskSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(5, "TItle should be at least 5 characters")
    .max(TITLE_MAX_LENGTH, "Title cannot exceed 50 characters"),
  description: z.string(),
  priority: PrioritySchema,
  done: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;

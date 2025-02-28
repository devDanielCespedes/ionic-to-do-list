import { z } from "zod";
import { TaskSchema } from "../../shared/schemas";

export const EditTaskModalPropsSchema = z.object({
  isOpen: z.boolean(),
  onClose: z.function().args().returns(z.void()),
  task: TaskSchema.optional(),
});

export type EditTaskModalProps = z.infer<typeof EditTaskModalPropsSchema>;

export const updateTaskInputSchema = TaskSchema;

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

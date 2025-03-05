import { z } from "zod";
import { useTaskSchema } from "../../shared/schemas";

export const useEditTaskModalPropsSchema = () => {
  const updateTaskInputSchema = useTaskSchema();

  return z.object({
    isOpen: z.boolean(),
    onClose: z.function().args().returns(z.void()),
    task: updateTaskInputSchema.optional(),
  });
};

export type EditTaskModalProps = z.infer<ReturnType<typeof useEditTaskModalPropsSchema>>;

export const useUpdateTaskInputSchema = () => {
  const updateTaskInputSchema = useTaskSchema();
  return updateTaskInputSchema;
};

export type UpdateTaskInput = z.infer<ReturnType<typeof useUpdateTaskInputSchema>>;

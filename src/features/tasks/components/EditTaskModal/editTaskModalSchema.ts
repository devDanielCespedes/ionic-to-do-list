import { z } from "zod";
import { TaskSchema } from "../../shared/schemas";

export const EditTaskModalPropsSchema = z.object({
  isOpen: z.boolean(),
  onClose: z.function().args().returns(z.void()),
  task: TaskSchema,
  onSave: z.function().args(TaskSchema).returns(z.void()),
});

export type EditTaskModalProps = z.infer<typeof EditTaskModalPropsSchema>;

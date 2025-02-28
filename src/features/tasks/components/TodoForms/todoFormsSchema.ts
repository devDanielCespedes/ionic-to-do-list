import { TaskSchema } from "../../shared/schemas";

export const TaskFormSInputSchema = TaskSchema.omit({ id: true, done: true });

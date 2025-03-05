import { useTaskSchema } from "../../shared/schemas";

export const useTaskFormSInputSchema = () => {
  const TaskSchema = useTaskSchema();
  return TaskSchema.omit({ id: true, done: true });
};

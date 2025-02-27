import { z } from "zod";
import { PrioritySchema } from "../../shared/schemas";

const priorityCheckboxPropsSchema = z.object({
  priority: PrioritySchema,
  selectedPriorities: z.array(PrioritySchema),
  togglePriority: z.function().args(PrioritySchema, z.boolean()).returns(z.void()),
  label: z.string().optional(),
});

export type PriorityCheckboxProps = z.infer<typeof priorityCheckboxPropsSchema>;

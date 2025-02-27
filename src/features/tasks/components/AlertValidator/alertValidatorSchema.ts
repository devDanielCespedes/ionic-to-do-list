import { z } from "zod";

export const AlertValidatorPropsSchema = z.object({
  message: z.string(),
  onDidDismiss: z.function(),
});

export type AlertValidatorProps = z.infer<typeof AlertValidatorPropsSchema>;

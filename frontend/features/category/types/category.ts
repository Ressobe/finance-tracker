import { z } from "zod";

export const newCategorySchema = z.object({
  name: z.string(),
});

export type NewCategory = z.infer<typeof newCategorySchema>;

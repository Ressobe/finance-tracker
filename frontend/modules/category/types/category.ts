import { z } from "zod";

export const newCategorySchema = z.object({
  name: z.string(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export type NewCategory = z.infer<typeof newCategorySchema>;

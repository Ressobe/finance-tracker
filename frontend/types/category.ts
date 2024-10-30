import { z } from "zod";

export const newCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "The name must be at least two characters long" })
    .max(50, { message: "The name cannot be longer than 50 characters!" }),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export type NewCategory = z.infer<typeof newCategorySchema>;

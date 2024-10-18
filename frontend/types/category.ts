import { z } from "zod";

export const newCategorySchema = z.object({
  name: z.string(),
});

import { z } from "zod";

export const accountSchema = z.object({
  name: z.string(),
  currentBalance: z.number(),
});

export type Account = z.infer<typeof accountSchema>;

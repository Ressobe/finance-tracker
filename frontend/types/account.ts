import { z } from "zod";

export const newAccountSchema = z.object({
  name: z.string(),
  currentBalance: z.number(),
});

export type NewAccount = z.infer<typeof newAccountSchema>;

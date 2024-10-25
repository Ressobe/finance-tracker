import { z } from "zod";

export const newSavingTransactionSchema = z.object({
  description: z.string().optional(),
  amount: z.number(),
});

export type NewSavingTransaction = z.infer<typeof newSavingTransactionSchema>;

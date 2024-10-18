import { z } from "zod";

export const newTransacitonSchema = z.object({
  description: z.string().optional(),
  amount: z.number(),
  categoryId: z.number(),
  transactionDate: z.date(),
});

export type TransactionType = "income" | "expense";

export type NewTransaction = z.infer<typeof newTransacitonSchema>;

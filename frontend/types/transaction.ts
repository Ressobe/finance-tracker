import { z } from "zod";
import { amountSchema, idSchema } from "./amount";

export const newTransacitonSchema = z.object({
  description: z.string().optional(),
  amount: amountSchema,
  categoryId: idSchema,
  transactionDate: z.date(),
});

export const transactionSchema = z.object({
  id: z.number(),
  description: z.string().optional(),
  amount: amountSchema,
  categoryId: idSchema,
  createdAt: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export type TransactionType = "income" | "expense";

export type NewTransaction = z.infer<typeof newTransacitonSchema>;

import { z } from "zod";
import { amountSchema, idSchema } from "./amount";

export const newTransacitonSchema = z.object({
  description: z.string().optional(),
  amount: amountSchema,
  categoryId: idSchema,
  transactionDate: z.date(),
});

export type TransactionType = "income" | "expense";

export type NewTransaction = z.infer<typeof newTransacitonSchema>;

import { z } from "zod";

export const newSavingTransactionSchema = z.object({
  description: z.string().optional(),
  amount: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }),
  accountId: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }),
});

export type NewSavingTransaction = z.infer<typeof newSavingTransactionSchema>;

export const savingTransactionSchema = z.object({
  id: z.number(),
  savingGoalId: z.number(),
  accountId: z.number(),
  amount: z.number(),
  createdAt: z.string(),
  description: z.string(),
});

export type SavingTransaction = z.infer<typeof savingTransactionSchema>;

import { z } from "zod";

export const newTransacitonSchema = z.object({
  description: z.string().optional(),
  amount: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }),
  categoryId: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }),
  transactionDate: z.date(),
});

export type TransactionType = "income" | "expense";

export type NewTransaction = z.infer<typeof newTransacitonSchema>;

import { z } from "zod";

export const newTransferSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  sourceAccountId: z.number(),
  destinationAccountId: z.number(),
});

export const transferSchema = z.object({
  id: z.number(),
  amount: z.number(),
  description: z.string(),
  sourceAccountId: z.number(),
  destinationAccountId: z.number(),
});

export type Transfer = z.infer<typeof transferSchema>;

export type NewTransfer = z.infer<typeof newTransferSchema>;

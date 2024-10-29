import { z } from "zod";

export const newTransferSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  sourceAccountId: z.number(),
  destinationAccountId: z.number(),
});

export type NewTransfer = z.infer<typeof newTransferSchema>;

import { z } from "zod";

export const newSavingGoalSchema = z.object({
  name: z.string(),
  targetAmount: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }),
});

export const savingGoalModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentSaved: z.number(),
  targetAmount: z.number(),
  createdAt: z.date(),
});

export type SavingGoalModel = z.infer<typeof savingGoalModelSchema>;

export type NewSavingGoal = z.infer<typeof newSavingGoalSchema>;

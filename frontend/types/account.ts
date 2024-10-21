import { z } from "zod";

export const accountSchema = z.object({
  name: z.string(),
  currentBalance: z
    .string()
    .transform((val) => parseFloat(val)) // Konwersja stringa na liczbę
    .refine((val) => !isNaN(val), { message: "Must be a number" }),
});

export type Account = z.infer<typeof accountSchema>;

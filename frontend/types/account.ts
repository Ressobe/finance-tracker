import { z } from "zod";

export const accountSchema = z.object({
  name: z.string(),
  currentBalance: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }),
});

export const accountModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentBalance: z.number(),
});

export const accountsLocalStorageSchema = z.object({
  accounts: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export type AccountsLocalStorage = z.infer<typeof accountsLocalStorageSchema>;

export type AccountModel = z.infer<typeof accountModelSchema>;

export type Account = z.infer<typeof accountSchema>;

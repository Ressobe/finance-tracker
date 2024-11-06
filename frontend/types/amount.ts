import { z } from "zod";

export const amountSchema = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
  .refine((val) => !isNaN(val), { message: "Must be a valid number" })
  .refine((val) => val > 0, { message: "Amount must be greater than zero" })
  .refine(
    (val) => {
      const decimalPart = val.toString().split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    },
    { message: "Amount must have at most two decimal places" },
  );

export const idSchema = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
  .refine((val) => !isNaN(val), { message: "Must be a valid number" });

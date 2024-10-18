import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type Login = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    name: z.string().min(1, {
      message: "Name is required",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type Register = z.infer<typeof registerSchema>;

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    bio: z.optional(z.string()),
    password: z.optional(
      z.string().min(8, { message: "Passowrd require minimum 8 characters" }),
    ),
    newPassword: z.optional(
      z.string().min(8, { message: "Passowrd require minimum 8 characters" }),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const sessionSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
  isOAuth: z.boolean().optional(),
});

export type Session = z.infer<typeof sessionSchema>;

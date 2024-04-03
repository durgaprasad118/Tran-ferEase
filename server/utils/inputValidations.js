import { z } from "zod";
export const signUpBody = z.object({
  firstName: z
    .string()
    .trim()
    .min()
    .max(50, { message: "name should be minimum 3 characters" }),
  lastName: z
    .string()
    .trim()
    .max(50)
    .min(3, { message: " name should be minimum 3 characters " }),
  username: z
    .string()
    .min(3)
    .max(30)
    .email({ message: "invlaid email and max is 30 and min is 3 charcters" }),
  password: z
    .string()
    .trim()
    .min(3, { message: "password must be > 3 characters" }),
});

export const signInBody = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .email({ message: "invlaid email and max is 30 and min is 3 charcters" }),
  password: z
    .string()
    .trim()
    .min(3, { message: "password must be > 3 characters" }),
});

export const updateBody = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z
    .string()
    .trim()
    .max(50)
    .min(3, { message: "min 3 and max 50 and it shoudl be string" })
    .optional(),
  currentPassword: z
    .string()
    .trim()
    .min(3, { message: "password must be > 3 characters" })
    .optional(),
  newPassword: z
    .string()
    .trim()
    .min(3, { message: "password must be > 3 characters" })
    .optional(),
});

export const transferBody = z.object({
  amount: z.number().positive({ message: "Enter a valid amount" }),
  to: z.string(),
});

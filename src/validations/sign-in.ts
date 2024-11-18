import { z } from "zod";

export const signInValidation = z
  .object({
    email: z
      .string({ message: "email field is required" })
      .email({ message: "email format is wrong" }),
    password: z.string({ message: "password field is required" }),
  })
  .required();

export const emailValidation = z
  .object({
    email: z
      .string({ message: "email field is required" })
      .email({ message: "email format is wrong" }),
  });


export type EmailVerifyType = z.infer<typeof emailValidation>;
export type SignInType = z.infer<typeof signInValidation>;

import { z } from "zod";

export const CustomerType = z.enum(["INDIVIDUAL", "BUSINESS"]);

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    }),
  type: CustomerType,
});

export const accountType = ["INDIVIDUAL", "BUSINESS"];

export type SignupFormValues = z.infer<typeof signUpSchema>;

import { useBankStore } from "@/store";
import { z } from "zod";

const getStoredEmails = () => {
  const userEmails = useBankStore.getState().usersTable;
  return Object.keys(userEmails);
};

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
  email: z
    .string()
    .email("Invalid email")
    .refine(
      (email) => {
        return !getStoredEmails().includes(email);
      },
      { message: "Email already exists" }
    ),
  type: CustomerType,
});

export const accountType = ["INDIVIDUAL", "BUSINESS"];

export type SignupFormValues = z.infer<typeof signUpSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Email or ID is required") // Evita que el campo esté vacío
    .refine(
      (value) =>
        z.string().email().safeParse(value).success ||
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          value
        ),
      { message: "Enter a valid Email or ID" }
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

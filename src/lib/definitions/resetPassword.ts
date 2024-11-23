import { z } from "zod";

export const ResetPasswordFormSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Password tidak sama",
    }
  );

interface ErrorFormState {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
}

export type ResetPaasswordState = ErrorFormState | undefined;

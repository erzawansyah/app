import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

interface ErrorFormState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

export type LoginFormState = ErrorFormState | undefined;


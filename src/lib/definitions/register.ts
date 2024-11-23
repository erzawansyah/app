import { z } from "zod";

// Skema Validasi untuk Form Register
export const RegisterFormSchema = z
  .object({
    fullname: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    whatsapp: z
      .string()
      .min(10, "Nomor WhatsApp minimal 10 karakter")
      .max(13, "Nomor WhatsApp maksimal 13 karakter")
      .refine((value) => value.startsWith("08"), {
        message: "Nomor WhatsApp harus diawali dengan 08",
      })
      .optional(), // Field opsional
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama dengan password",
    path: ["confirmPassword"], // Mengarahkan error ke confirmPassword
  });

// Interface untuk Error State
export interface ErrorFormState {
  errors?: {
    fullname?: string[];
    email?: string[];
    whatsapp?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
}

// Tipe Form Register
export type RegisterFormState = ErrorFormState | undefined;

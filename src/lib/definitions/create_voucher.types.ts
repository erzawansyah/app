import { z } from "zod";

// Validasi schema form untuk voucher
export const CreateVoucherFormSchema = z.object({
  title: z.string().min(1, { message: "Judul tidak boleh kosong" }),
  description: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "File harus berupa gambar",
    })
    .optional(),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Format tanggal tidak valid",
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Format tanggal tidak valid",
  }),
  prefix: z
    .string()
    .max(3, { message: "Prefix tidak boleh lebih dari 3 karakter" }),
  max_claim: z
    .number()
    .int({ message: "Jumlah klaim harus berupa angka bulat" }),
});

// Tipe untuk state error
interface ErrorFormState {
  errors?: {
    title?: string[];
    description?: string[];
    image?: string[];
    start_date?: string[];
    end_date?: string[];
    prefix?: string[];
    max_claim?: string[];
  };
  message?: string;
}

// Tipe untuk form state
export type CreateVoucherFormState = ErrorFormState | undefined;

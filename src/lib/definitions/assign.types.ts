import { z } from "zod";

export const AssignVoucherFormSchema = z.object({
  voucherId: z.string(),
  userId: z.string(),
  quantity: z.string(),
});

interface ErrorFormState {
  errors?: {
    voucherId?: string[];
    userId?: string[];
    quantity?: string[];
  };
  message?: string;
}

export type AssignVoucherFormState = ErrorFormState | undefined;

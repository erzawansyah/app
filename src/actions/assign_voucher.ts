"use server";
import {
  AssignVoucherFormState,
  AssignVoucherFormSchema,
} from "@/lib/definitions/assign.types";
import { pending } from "@/lib/helpers/pending";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { redirect } from "next/navigation";

export const assignVouchers = async (
  formState: AssignVoucherFormState,
  formData: FormData
) => {
  const voucherId = formData.get("voucherId");
  const userId = formData.get("userId");
  const quantity = formData.get("quantity");

  await pending(1000);
  // Simulate a pending request

  //   Validate form using Zod
  const validatedFields = AssignVoucherFormSchema.safeParse({
    voucherId,
    userId,
    quantity,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { data: voucher, error: voucherError } = await supabase
    .from("vouchers")
    .select("*")
    .eq("id", voucherId as string)
    .single();

  if (voucherError) {
    return {
      message: `Error saat mengambil data voucher.: ${voucherError.message}`,
    };
  }
  const { data: voucherClaims, error: voucherClaimsError } = await supabase
    .from("voucher_claims")
    .select("id", { count: "exact" })
    .match({
      voucher_id: voucherId,
      user_id: userId,
    });

  console.log(voucherClaims);

  if (voucherClaimsError) {
    return {
      message: `Error saat mengambil data voucher claims.: ${voucherClaimsError.message}`,
    };
  }

  // jika quantity yang di-assign melebihi jumlah voucher yang diizinkan
  if (
    parseInt(quantity as string) &&
    parseInt(quantity as string) > voucher?.max_claim
  ) {
    return {
      errors: {
        quantity: [
          `Jumlah voucher yang di-assign melebihi jumlah maksimal yang diizinkan (${voucher?.max_claim}).`,
        ],
      },
    };
  }

  // jika jumlah voucher_claim yang dimiliki user sudah melebihi jumlah maksimal yang diizinkan
  if (
    voucherClaims.length > 0 &&
    voucherClaims.length + parseInt(quantity as string) > voucher?.max_claim
  ) {
    return {
      errors: {
        userId: [
          `User sudah memiliki ${voucherClaims.length} voucher. Jumlah voucher yang di-assign melebihi jumlah maksimal yang diizinkan (${voucher?.max_claim}).`,
        ],
      },
    };
  }

  // Assign voucher to user
  const response = await supabase.rpc("generate_voucher_claims", {
    p_voucher_id: voucherId as string,
    p_user_id: userId as string,
    p_count: parseInt(quantity as string),
  });

  if (response.error) {
    return {
      message: `Gagal meng-assign voucher: ${response.error.message}`,
    };
  }

  redirect("/vouchers");
};

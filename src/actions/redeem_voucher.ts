"use server";

import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { redirect } from "next/navigation";

export const redeemVoucher = async (formData: FormData) => {
  // Get the voucher code from the form data
  const voucherCode = formData.get("voucherCode") as string;
  const supabase = await createClient();

  const { data: response, error } = await supabase.rpc("redeem_voucher", {
    p_voucher_code: voucherCode,
  });

  if (error) {
    console.error("Error redeeming voucher:", error.message);
    return { error: error.message };
  }
  // Return the response data
  return {
    data: response,
  };
};

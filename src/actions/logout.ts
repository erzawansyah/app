'use server';
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Gagal logout:", error.message);
    return;
  }

  redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
};

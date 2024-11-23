"use server";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { redirect } from "next/navigation";
import { headers as hd } from "next/headers";

export const logout = async () => {
  // protocol
  const headers = await hd();
  const protocol = headers.get("x-forwarded-proto") || "http";
  const site = headers.get("host") || "localhost:3000";
  const host = `${protocol}://${site}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Gagal logout:", error.message);
    return;
  }

  redirect(`${host}/login`);
};

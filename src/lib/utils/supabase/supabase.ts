import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export function createClient() {
  return createBrowserClient<Database>(supabase_url, anon_key);
}

export const supabaseClient = createClient();

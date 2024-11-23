import { createBrowserClient } from "@supabase/ssr";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

function createClient() {
  return createBrowserClient(supabase_url, anon_key);
}

export const supabaseClient = createClient();

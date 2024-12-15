import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/supabase-ssr";

export const getProfile = async (user: User) => {
  const userId = user.id;
  // fetch user profile from database
  const supa = await createClient();
  const { data: profile, error } = await supa
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return profile;
};

export const getUserRole = async (user: User) => {
  const userId = user.id;
  // fetch user role from database
  const supa = await createClient();
  const { data: profile, error } = await supa
    .from("profiles")
    .select("approle")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return profile?.approle;
};

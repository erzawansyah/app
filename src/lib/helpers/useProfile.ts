"use client";
import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabase/supabase";
import { Tables } from "../utils/supabase/database.types";
import { useSupabaseUser } from "./useSupabaseUser";
import { User } from "@supabase/supabase-js";

type Profile = Tables<"profiles">;

export const useProfile = () => {
  const user = useSupabaseUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchProfile = async (user: User) => {
      const supabase = supabaseClient;
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("Error fetching profile data:", error.message);
      }

      setProfile(profile);
    };

    if (user) {
      fetchProfile(user);
    }
  }, [user]);

  return profile;
};

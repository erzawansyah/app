"use client";
import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabase/supabase";
import { User } from "@supabase/supabase-js";

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = supabaseClient;
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log("Error fetching user data:", error.message);
      }

      setUser(user);
    };
    fetchUser();
  }, []);

  return user;
};

"use server";
import { LoginFormState, LoginFormSchema } from "@/lib/definitions/login";
import { pending } from "@/lib/helpers/pending";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { redirect } from "next/navigation";

export const login = async (formState: LoginFormState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  await pending(2000);
  // Simulate a pending request

  //   Validate form using Zod
  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  });

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  redirect("/dashboard");
};

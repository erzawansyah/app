"use server";
import { LoginFormState, LoginFormSchema } from "@/lib/definitions/login";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { redirect } from "next/navigation";

export const resetPassword = async (
  formState: LoginFormState,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  //   Validate form using Zod
  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email: email as string,
    password: password as string,
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect("/login");
};

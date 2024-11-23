"use server";
import {
  RegisterFormState,
  RegisterFormSchema,
} from "@/lib/definitions/register";
// import { pending } from "@/lib/helpers/pending";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { pending } from "@/lib/helpers/pending";

export const register = async (
  formState: RegisterFormState,
  formData: FormData
) => {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const whatsapp = formData.get("whatsapp");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const host = process.env.NEXT_PUBLIC_HOST;
  const successfullRegisterPath = "/register/thanks";
  // Simulate a pending request

  //   Validate form using Zod
  const validatedFields = RegisterFormSchema.safeParse({
    fullname,
    email,
    whatsapp,
    password,
    confirmPassword,
  });

  await pending(2000);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const emailResponse = await supabase.rpc("check_email_exists", {
    email: email as string,
  });

  if (emailResponse.data) {
    return {
      errors: {
        email: [`Email ${email} sudah terdaftar. Silahkan gunakan email lain.`],
      },
    };
  }

  // Sign up user
  const { error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
    phone: whatsapp as string,
    options: {
      emailRedirectTo: `${host}/api/auth/callback`,
      data: {
        fullname: fullname as string,
        whatsapp: whatsapp as string,
      },
    },
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect(`${host}${successfullRegisterPath}`);
};

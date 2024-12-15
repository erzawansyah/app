"use server";
import {
  CreateVoucherFormSchema,
  CreateVoucherFormState,
} from "@/lib/definitions/create_voucher.types";
import { pending } from "@/lib/helpers/pending";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";

export const createVouchers = async (
  formState: CreateVoucherFormState,
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image") as File | null;
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const prefix = formData.get("prefix");
    const max_claim_raw = formData.get("max_claim");
    const max_claim = max_claim_raw
      ? parseInt(max_claim_raw as string, 10)
      : null;

    console.log("Form data received for voucher creation:", {
      title,
      description,
      image,
      start_date,
      end_date,
      prefix,
      max_claim,
    });

    await pending(1000); // Simulate delay for async operations

    // Validate form using Zod schema
    const validatedFields = CreateVoucherFormSchema.safeParse({
      title,
      description,
      image,
      start_date,
      end_date,
      prefix,
      max_claim,
    });

    if (!validatedFields.success) {
      console.error(
        "Validation errors:",
        validatedFields.error.flatten().fieldErrors
      );
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();

    // Handle file upload if image is provided
    let uploadedImageUrl = null;
    if (image) {
      const { data: fileResponse, error: fileError } = await supabase.storage
        .from("voucher-images")
        .upload(
          `${prefix as string}-${Date.now()}-${image.name
            .replace(/\s/g, "_")
            .toLowerCase()}`,
          image
        );

      if (fileError) {
        console.error("File upload error:", fileError.message);
        // Use placeholder image as fallback if upload fails
        uploadedImageUrl = "https://via.placeholder.com/300x200";
      } else {
        console.log("File upload successful:", fileResponse);
        uploadedImageUrl = fileResponse?.path
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileResponse.path}`
          : "https://via.placeholder.com/300x200";
      }
    }

    // Insert voucher into the database
    const { error: voucherError } = await supabase.from("vouchers").insert({
      title: title as string,
      description: description as string,
      image_url: uploadedImageUrl,
      start_date: start_date as string,
      end_date: end_date as string,
      prefix: prefix as string,
      max_claim: max_claim as number,
      created_at: new Date().toISOString(),
    });

    if (voucherError) {
      console.error(
        "Error inserting voucher into database:",
        voucherError.message
      );
      return {
        message: `Error saat membuat voucher: ${voucherError.message}`,
      };
    }

    console.log("Voucher created successfully.");
    return {
      message: "Voucher berhasil dibuat.",
    };
  } catch (error) {
    console.error("Unexpected error during voucher creation:", error);
    return {
      message:
        "Terjadi kesalahan tak terduga saat membuat voucher. Silakan coba lagi.",
    };
  }
};

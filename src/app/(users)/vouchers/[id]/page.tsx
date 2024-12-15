import React from "react";
import VoucherDetail, { VoucherDetailProps } from "@/components/Vouchers/VoucherDetails";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";


export interface VoucherClaim {
    id: string; // UUID primary key
    user_id: string; // Foreign key ke auth.users.id
    voucher_id: string; // Foreign key ke vouchers.id
    claimed_at: string; // Timestamp saat voucher diklaim
    is_redeemed: boolean; // Status apakah voucher sudah diredeem
    redeemed_at: string | null; // Timestamp saat voucher diredeem, null jika belum diredeem
    voucher_code: string; // Kode unik voucher
}


const VoucherDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    const voucherDetails = await getVoucherData(id);

    // Cara menggunakan:
    return <VoucherDetail key={voucherDetails?.id} {...voucherDetails} />;
};

export default VoucherDetailPage;


const getVoucherData = async (id: string): Promise<VoucherDetailProps> => {
    const supabase = await createClient();

    const { data: voucher, error: errorVoucher } = await supabase
        .from("vouchers")
        .select('*, voucher_claims(*)')
        .eq('id', id)
        .single();

    if (errorVoucher) {
        throw errorVoucher;
    }

    return {
        id: voucher.id,
        title: voucher.title,
        description: voucher.description,
        imageUrl: voucher.image_url || undefined,
        startDate: voucher.start_date,
        expiryDate: voucher.end_date,
        codes: voucher.voucher_claims.filter((claim: VoucherClaim) => !claim.is_redeemed).map((claim: VoucherClaim) => claim.voucher_code),
    }
}

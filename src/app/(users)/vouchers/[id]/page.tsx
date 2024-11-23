import React from "react";
import VoucherDetail, { VoucherDetailProps } from "@/components/Vouchers/VoucherDetails";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";

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
        imageUrl: voucher.image_url,
        startDate: voucher.start_date,
        expiryDate: voucher.end_date,
        codes: voucher.voucher_claims.filter((claim: any) => !claim.is_redeemed).map((claim: any) => claim.voucher_code),
    }
}

import React from "react";
import VoucherItems, { VoucherItemsProps, } from "@/components/Vouchers/VoucherItems";
import { sortVouchers } from "@/lib/helpers/voucherSort";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { VoucherClaim } from "./[id]/page";


export interface VoucherDefinition {
    id: string; // UUID primary key
    title: string; // Judul voucher
    description: string; // Deskripsi voucher
    image_url: string | null; // URL gambar voucher (opsional)
    start_date: string; // Tanggal mulai berlaku
    end_date: string; // Tanggal berakhir berlaku
    is_active: boolean; // Status apakah voucher aktif
    created_at: string; // Timestamp saat voucher dibuat
    updated_at: string; // Timestamp terakhir kali voucher diperbarui
    prefix: string; // Prefix unik untuk voucher
    max_claim: number; // Jumlah maksimum klaim
    usedCount?: number; // Jumlah klaim yang sudah digunakan
    totalCount?: number; // Jumlah total klaim
}


const Vouchers: React.FC = async () => {
    const data = await getVoucherData()
    const vouchers = sortVouchers(data);

    return (
        <div className="max-w-md mx-auto flex flex-col gap-6">
            {vouchers.map((voucher) => (
                <VoucherItems key={voucher.id} {...voucher} />
            ))}
        </div>
    );
};

export default Vouchers;



const getVoucherData = async () => {
    const supabase = await createClient();

    const { data: vouchers, error: errorVouchers } = await supabase.from("vouchers")
        .select(`*, voucher_claims(*)`)

    if (errorVouchers) {
        throw new Error(errorVouchers.message);
    }

    const response = vouchers?.map((voucher) => {
        return {
            ...voucher,
            usedCount: voucher.voucher_claims.map((claim: VoucherClaim) => claim.is_redeemed ? 1 : 0).reduce((a: number, b: number) => a + b, 0),
            totalCount: voucher.voucher_claims.length,
        };
    });

    return response?.map((voucher: VoucherDefinition) => {
        return {
            id: voucher.id,
            title: voucher.title,
            description: voucher.description,
            imageUrl: voucher.image_url,
            startDate: voucher.start_date,
            expiryDate: voucher.end_date,
            usedCount: voucher.usedCount,
            totalCount: voucher.totalCount,
        };
    }) as VoucherItemsProps[];
};

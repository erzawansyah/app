import React from "react";
import VoucherItems, { VoucherItemsProps, } from "@/components/Vouchers/VoucherItems";
import { sortVouchers } from "@/lib/helpers/voucherSort";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";

const voucherItemsData: VoucherItemsProps[] = [
    {
        id: "voucher-1",
        title: "Diskon 20% Semua Menu",
        description: "Voucher ini berlaku untuk semua menu di Omah Diksi.",
        totalCount: 10,
        usedCount: 3,
        imageUrl: "https://via.placeholder.com/300x200",
        startDate: "2024-11-01",
        expiryDate: "2024-11-31",
    },
    {
        id: "voucher-2",
        title: "Gratis Kopi untuk Pembelian Pertama",
        description: "Dapatkan gratis kopi untuk pembelian pertama Anda di Omah Diksi.",
        totalCount: 5,
        usedCount: 5,
        imageUrl: "https://via.placeholder.com/300x200",
        startDate: "2024-02-01",
        expiryDate: "2024-02-28",
    },
    {
        id: "voucher-3",
        title: "Diskon 10% Semua Buku",
        description: "Voucher ini berlaku untuk pembelian buku apa pun di Omah Diksi.",
        totalCount: 8,
        usedCount: 2,
        imageUrl: "https://via.placeholder.com/300x200",
        startDate: "2023-12-01",
        expiryDate: "2023-12-31",
    },
];


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
            usedCount: voucher.voucher_claims.map((claim: any) => claim.is_redeemed ? 1 : 0).reduce((a: number, b: number) => a + b, 0),
            totalCount: voucher.voucher_claims.length,
        };
    });

    return response?.map((voucher: any) => {
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
    });
};

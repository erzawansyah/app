import QRCodeGenerator from "@/components/QRCode";
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import Link from "next/link";
import { headers as hd } from "next/headers";

const ClaimVoucher = async ({
    params,
}: {
    params: Promise<{ code: string }>;
}) => {
    // hostname
    const headers = await hd();
    const protocol = headers.get("x-forwarded-proto") || "http";
    const site = headers.get("host") || "localhost:3000";
    const host = `${protocol}://${site}`;

    const voucher = await getVoucherClaimsData((await params).code);
    const is_redeemed = voucher?.is_redeemed;

    const url = `${host}/crew/vouchers/redeem/${voucher?.voucher_code}`;
    const voucher_url = `/vouchers/${voucher?.voucher_id}`;

    if (!voucher) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-md w-full p-6 bg-white border-4 border-black rounded-lg shadow-md text-center mx-auto">
            <h1 className="text-3xl font-bold text-black mb-4">Kode Klaim</h1>
            <p className="text-gray-dark mb-6">
                Tunjukkan barcode ini kepada petugas untuk memvalidasi voucher Anda.
            </p>

            {/* Barcode/QR Code */}
            <div className="mb-6 bg-gray-200 border border-gray-300 p-8">
                {is_redeemed ? (
                    <p className="text-red-600">Voucher sudah digunakan</p>
                ) : (
                    <QRCodeGenerator value={url} size={250} />
                )}
            </div>

            <Link
                href={`${voucher_url}`}
                className="bg-primary text-white font-bold py-2 px-4 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default ClaimVoucher;

const getVoucherClaimsData = async (code: string) => {
    const supabase = await createClient();

    const { data: claims, error: errorClaims } = await supabase
        .from("voucher_claims")
        .select("*")
        .eq("voucher_code", code)
        .single();

    if (errorClaims) {
        throw errorClaims;
    }

    return claims;
};

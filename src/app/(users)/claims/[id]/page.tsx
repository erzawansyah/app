"use client";

import QRCodeGenerator from "@/components/QRCode";
import { useRouter } from "next/navigation";
// import QRCode from "qrcode.react"; // Gunakan library untuk barcode/QR code

const ClaimVoucher = () => {
    const router = useRouter();
    const claim_id = "ABC123"; // Ganti dengan kode klaim yang didapat dari URL

    if (!claim_id) {
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
                {/* <QRCode value={claim_id as string} size={200} /> */}
                <QRCodeGenerator value="https://sediksi.com" size={250} />
            </div>

            <button
                onClick={() => router.push("/vouchers")}
                className="bg-primary text-white font-bold py-2 px-4 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
            >
                Kembali ke Beranda
            </button>
        </div>
    );
};

export default ClaimVoucher;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Voucher {
    id: string;
    title: string;
    description: string;
    expiryDate: string;
    isClaimed: boolean;
}

const Vouchers = () => {
    const router = useRouter();

    // Simulasi data voucher
    const [vouchers, setVouchers] = useState<Voucher[]>([
        {
            id: "1",
            title: "Diskon 20% Semua Menu",
            description: "Voucher berlaku hingga akhir bulan.",
            expiryDate: "2024-11-30",
            isClaimed: false,
        },
        {
            id: "2",
            title: "Gratis Kopi untuk Satu Pembelian",
            description: "Voucher berlaku untuk pembelian pertama.",
            expiryDate: "2024-12-15",
            isClaimed: false,
        },
        {
            id: "3",
            title: "Diskon 10% Semua Buku",
            description: "Voucher berlaku hingga akhir tahun.",
            expiryDate: "2024-12-31",
            isClaimed: true,
        },
    ]);

    // Handler untuk klaim voucher
    const handleClaim = (id: string) => {
        setVouchers((prev) =>
            prev.map((voucher) =>
                voucher.id === id ? { ...voucher, isClaimed: true } : voucher
            )
        );

        // Redirect ke halaman klaim voucher
        router.push(`/vouchers/${id}`);
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                {/* Navigasi ke Dashboard */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mb-6 bg-primary text-white font-bold py-2 px-4 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
                >
                    ← Kembali ke Dashboard
                </button>

                {/* Voucher Tersedia */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-black mb-4">Voucher Tersedia</h2>
                    <div className="space-y-4">
                        {vouchers.filter((voucher) => !voucher.isClaimed).length > 0 ? (
                            vouchers
                                .filter((voucher) => !voucher.isClaimed)
                                .map((voucher) => (
                                    <div
                                        key={voucher.id}
                                        className="p-4 bg-white border-4 border-black rounded-lg shadow-md"
                                    >
                                        <h3 className="text-xl font-bold text-black">{voucher.title}</h3>
                                        <p className="text-gray-dark">{voucher.description}</p>
                                        <p className="text-sm text-gray-dark mt-2">
                                            Berlaku hingga: {voucher.expiryDate}
                                        </p>
                                        <button
                                            onClick={() => handleClaim(voucher.id)}
                                            className="mt-4 w-full bg-primary text-white font-bold py-2 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
                                        >
                                            Klaim Voucher
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-dark">Tidak ada voucher tersedia.</p>
                        )}
                    </div>
                </div>

                {/* Riwayat Voucher */}
                <div>
                    <h2 className="text-2xl font-bold text-black mb-4">Riwayat Voucher</h2>
                    <div className="space-y-4">
                        {vouchers.filter((voucher) => voucher.isClaimed).length > 0 ? (
                            vouchers
                                .filter((voucher) => voucher.isClaimed)
                                .map((voucher) => (
                                    <div
                                        key={voucher.id}
                                        className="p-4 bg-gray-200 border-4 border-black rounded-lg shadow-md"
                                    >
                                        <h3 className="text-xl font-bold text-black">{voucher.title}</h3>
                                        <p className="text-gray-dark">{voucher.description}</p>
                                        <p className="text-sm text-gray-dark mt-2">
                                            Diklaim pada: {voucher.expiryDate}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-dark">Belum ada voucher yang diklaim.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Vouchers;

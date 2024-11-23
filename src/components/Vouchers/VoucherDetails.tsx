"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface VoucherDetailProps {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    startDate: string;
    expiryDate: string;
    codes: string[]; // Daftar kode voucher yang tersedia
}

const VoucherDetail: React.FC<VoucherDetailProps> = (props) => {
    const { id, title, description, imageUrl, startDate, expiryDate, codes } = props;
    const router = useRouter();

    const [availableCodes, setAvailableCodes] = useState(codes); // Daftar kode yang belum diklaim

    const handleClaim = (code: string) => {
        // Hapus kode yang sudah diklaim dari daftar
        setAvailableCodes((prev) => prev.filter((c) => c !== code));

        // Redirect ke halaman klaim voucher
        router.push(`/claims/${code}`);
    };

    const isActive =
        new Date() >= new Date(startDate) && new Date() <= new Date(expiryDate); // Status aktif voucher

    return (
        <div className="max-w-md mx-auto">
            {/* Gambar dan Informasi Utama */}
            <div className="p-6 bg-white border-4 border-black rounded-lg shadow-md mb-8">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-60 object-cover rounded-md mb-4"
                    />
                )}
                <h1 className="text-3xl font-bold text-black mb-4">{title}</h1>
                <p className="text-gray-dark text-lg mb-4">{description}</p>

                <div className="mt-4 text-gray-600 text-sm">
                    <p>Status: <span className={isActive ? "text-green-600" : "text-red-600"}>{isActive ? "Aktif" : "Tidak Aktif"}</span></p>
                    <p>Mulai: {new Date(startDate).toLocaleDateString()}</p>
                    <p>Berakhir: {new Date(expiryDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Daftar Kode Voucher */}
            <div className="">
                <h2 className="text-2xl font-bold text-black mb-4">Kode Voucher</h2>
                {availableCodes.length > 0 ? (
                    <ul className="space-y-4">
                        {availableCodes.map((code) => (
                            <li
                                key={code}
                                className="flex justify-between items-center p-4 bg-gray-100 border-2 border-black rounded-md"
                            >
                                <span className="font-mono text-black">{code}</span>
                                <button
                                    onClick={() => handleClaim(code)}
                                    className="bg-primary text-white font-bold py-2 px-4 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
                                >
                                    Klaim
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Semua kode voucher telah diklaim.</p>
                )}
            </div>
        </div>
    );
};

export default VoucherDetail;

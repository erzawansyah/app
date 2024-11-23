import Link from "next/link";
import React from "react";

export interface VoucherItemsProps {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    totalCount: number; // Total voucher yang tersedia
    usedCount: number;  // Jumlah voucher yang sudah digunakan
    startDate: string;
    expiryDate: string;
}

const VoucherItems: React.FC<VoucherItemsProps> = (props) => {
    const {
        id,
        title,
        description,
        imageUrl,
        totalCount,
        usedCount,
        startDate,
        expiryDate,
    } = props;

    const isActive = new Date() >= new Date(startDate) && new Date() <= new Date(expiryDate); // Cek apakah voucher aktif
    const unusedCount = totalCount - usedCount; // Hitung jumlah voucher yang belum digunakan

    return (
        <VoucherItemsLinkWrapper id={id} isActive={isActive}>
            <div
                className={`p-4 border-4 rounded-lg shadow-md ${unusedCount === 0 || !isActive ? "bg-gray-200 border-gray-400" : "bg-white border-black"
                    }`}
            >
                {/* Gambar Voucher */}
                {imageUrl && (
                    <div className="mb-4">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-40 object-cover rounded-md"
                        />
                    </div>
                )}

                {/* Informasi Voucher */}
                <h3 className="text-xl font-bold text-black">{title}</h3>
                <p className="text-gray-dark mt-2">{description}</p>

                {/* Status Voucher */}
                <div className="mt-4 flex justify-between items-center">
                    <p
                        className={`text-sm font-medium ${isActive ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {isActive ? "Aktif" : "Tidak Aktif"}
                    </p>
                    <p
                        className={`text-sm font-medium ${unusedCount > 0 ? "text-blue-600" : "text-gray-800"
                            }`}
                    >
                        {unusedCount > 0
                            ? `${unusedCount} voucher tersedia`
                            : "Semua voucher telah digunakan"}
                    </p>
                </div>

                {/* Periode Voucher */}
                <div className="mt-4 text-sm text-gray-600">
                    <p>Mulai: {new Date(startDate).toLocaleDateString()}</p>
                    <p>Berakhir: {new Date(expiryDate).toLocaleDateString()}</p>
                </div>
            </div>
        </VoucherItemsLinkWrapper>
    );
};


interface VoucherItemsLinkWrapperProps {
    id: string;
    isActive: boolean;
    children: React.ReactNode;
}

const VoucherItemsLinkWrapper: React.FC<VoucherItemsLinkWrapperProps> = ({ id, isActive, children }) => {
    return isActive ? (
        <Link href={`/vouchers/${id}`}>
            {children}
        </Link>
    ) : (
        <>{children}</>
    );
}

export default VoucherItems;

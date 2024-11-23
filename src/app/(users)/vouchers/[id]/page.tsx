"use client";

import React from "react";
import VoucherDetail, { VoucherDetailProps } from "@/components/Vouchers/VoucherDetails";

const voucherData = {
    id: "voucher-1",
    title: "Diskon 20% Semua Menu",
    description: "Voucher ini berlaku untuk semua menu di Omah Diksi.",
    imageUrl: "https://via.placeholder.com/300x200",
    startDate: "2024-01-01",
    expiryDate: "2024-12-31",
    codes: ["ABC123", "XYZ789", "DEF456"], // Daftar kode voucher
};

const VoucherDetailComponent: React.FC = () => {
    // Cara menggunakan:
    return <VoucherDetail key={voucherData.id} {...voucherData} />;
};

export default VoucherDetailComponent;

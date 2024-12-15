'use client';

import CreateVoucherForm from "@/components/Vouchers/CreateVoucherForm";

const CreateVoucherPage = () => {
    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white border-4 border-black rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide text-center">
                Create Voucher
            </h1>
            <CreateVoucherForm />
        </div>
    );
};

export default CreateVoucherPage;

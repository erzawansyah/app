import AssignVoucherForm from '@/components/Vouchers/AssignVoucherForm';

const AssignVoucherPage = () => {
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white border-4 border-black rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide text-center">
                Assign Voucher
            </h1>
            <AssignVoucherForm />
        </div>
    );
};

export default AssignVoucherPage;

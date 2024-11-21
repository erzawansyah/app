import Link from "next/link";

const ClaimVoucher = async ({ params }: { params: Promise<{ id: string }> }) => {
    const voucher_id = (await params).id;
    return (
        <>
            <div className="p-6 bg-white border-4 border-black rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-extrabold text-black uppercase">
                    Voucher #{voucher_id}
                </h1>
                <p className="mt-4 text-lg text-gray-dark font-medium">
                    Tunjukkan barcode ini kepada kru untuk memverifikasi voucher Anda.
                </p>

                <div className="mt-6 bg-gray-300 p-6 border-2 border-dashed border-black">
                    {/* Simulasi Barcode */}
                    <div className="text-xl font-bold text-black">[BARCODE HERE]</div>
                </div>
                <Link href="/vouchers">
                    <button
                        className="mt-6 w-full bg-primary text-white font-bold py-2 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
                    >
                        Kembali ke Voucher
                    </button>
                </Link>
            </div>
        </>
    );
};

export default ClaimVoucher;

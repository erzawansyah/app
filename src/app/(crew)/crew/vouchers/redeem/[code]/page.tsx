import { redeemVoucher } from '@/actions/redeem_voucher';
import RedeemConfirmationButton from '@/components/RedeemConfirmationButton';
import { getUserRole } from '@/lib/helpers/getProfile';
import { createClient } from '@/lib/utils/supabase/supabase-ssr';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react'

const CrewRedeemPage = async ({
    params,
}: {
    params: Promise<{ code: string }>;
}) => {
    const code = (await params).code;
    const supabase = await createClient();

    const user = await supabase.auth.getUser();

    if (!user) {
        return <div className="max-w-md w-full p-6 bg-red-100 border-4 border-l-8 border-red-700 rounded-lg shadow-md mx-auto">
            <h1 className="text-3xl font-bold text-red-700 mb-2">Error</h1>
            <p className="text-red-700">Anda belum login</p>
            <p>
                Silahkan login terlebih dahulu menggunakan device yang Anda gunakan sebelum melakukan scan.
            </p>
            <Link className="text-primary underline mt-4" href="/login">
                Login
            </Link>
        </div>;
    } else {
        const role = await getUserRole(user.data.user!);
        if (role !== 'crew') {
            redirect('/vouchers');
        }
    }






    const { data: claims, error: errorClaims } = await supabase
        .from("voucher_claims")
        .select("*, vouchers!inner(*)")
        .eq("voucher_code", code)
        .single();
    if (errorClaims) {
        return <div className="max-w-md w-full p-6 bg-red-100 border-4 border-l-8 border-red-700 rounded-lg shadow-md mx-auto">
            <h1 className="text-3xl font-bold text-red-700 mb-2">Error</h1>
            <p className="text-red-700">{errorClaims.message}</p>
            <p className="text-red-700 mt-2 mb-4 text-sm">{errorClaims.details}</p>
            <Link className="text-primary underline mt-4" href="/vouchers">
                Back to Vouchers
            </Link>
        </div>;
    }
    const { data: profile, error: errorProfile } = await supabase.from('profiles').select('fullname, email_address').eq('id', claims?.user_id!).single();
    if (errorProfile) {
        return <div className="max-w-md w-full p-6 bg-red-100 border-4 border-l-8 border-red-700 rounded-lg shadow-md mx-auto">
            <h1 className="text-3xl font-bold text-red-700 mb-2">Error</h1>
            <p className="text-red-700">{errorProfile.message}</p>
            <p className="text-red-700 mt-2 mb-4 text-sm">{errorProfile.details}</p>
            <Link className="text-primary underline mt-4" href="/vouchers">
                Back to Vouchers
            </Link>
        </div>;
    }
    const voucher = claims?.vouchers;
    const isRedeemed = claims?.is_redeemed;
    const formatedClaimDate = new Date(claims?.claimed_at!).toLocaleString();
    const formatedRedeemDate = isRedeemed ? new Date(claims?.redeemed_at!).toLocaleString() : 'Not Redeemed';



    if (isRedeemed) {
        return <RedeemedConfirmation
            code={code}
            voucher_name={voucher?.title}
            voucher_description={voucher?.description}
            user_name={profile?.fullname || 'Unknown'}
            user_email={profile?.email_address || 'Unknown'}
            claim_date={formatedClaimDate}
            redeem_date={formatedRedeemDate}
        />
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white border-4 border-black rounded-lg shadow-lg">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide">
                    Konfirmasi Redeem
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                    Pastikan informasi di bawah benar sebelum melanjutkan
                </p>
            </div>

            {/* Informasi */}
            <div className="mt-6 space-y-4">
                {/* Informasi Voucher */}
                <div className="bg-primary text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">Voucher Detail</h2>
                    <div className="mt-2">
                        <p className="flex justify-between">
                            <span className="font-bold">Kode:</span>
                            <span>{code}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-bold">Voucher:</span>
                            <span>{voucher?.title}</span>
                        </p>
                        <p className="mt-2">
                            <span className="font-bold block">Deskripsi:</span>
                            <span className="text-sm block">
                                {voucher?.description}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Informasi Pengguna */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-black">Informasi Pengguna</h2>
                    <div className="mt-2">
                        <p className="flex justify-between">
                            <span className="font-bold">Nama Pembeli:</span>
                            <span>{profile?.fullname || 'Unknown'}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-bold">Email:</span>
                            <span>
                                {profile?.email_address || 'Unknown'}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Informasi Tanggal */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="flex justify-between">
                        <span className="font-bold">Tanggal Klaim:</span>
                        <span>{formatedClaimDate}</span>
                    </p>
                </div>
            </div>

            {/* Tombol */}
            <div className="mt-6 space-y-4">
                <RedeemConfirmationButton code={code} />
                <button
                    type="button"
                    className="w-full text-lg font-bold text-red-600 bg-white py-3 border-2 border-red-600 rounded-md 
          hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-200 shadow-md"
                >
                    Batal
                </button>
            </div>
        </div>
    )
}

export default CrewRedeemPage

interface RedeemedConfirmationProps {
    code: string;
    voucher_name: string;
    voucher_description: string;
    user_name: string;
    user_email: string;
    claim_date: string;
    redeem_date: string;
}
const RedeemedConfirmation: React.FC<RedeemedConfirmationProps> = ({
    code,
    voucher_name,
    voucher_description,
    user_name,
    user_email,
    claim_date,
    redeem_date,
}) => {
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white border-4 border-black rounded-lg shadow-lg">
            {/* Header */}
            <div className="text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                <h1 className="text-2xl font-extrabold text-black uppercase tracking-wide mt-4">
                    Voucher Berhasil
                </h1>
                <p className="text-gray-600 text-sm">
                    Voucher ini telah berhasil di-redeem.
                </p>
            </div>

            {/* Informasi */}
            <div className="mt-6 space-y-4">
                {/* Informasi Voucher */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-black">Detail Voucher</h2>
                    <div className="mt-2">
                        <p className="flex justify-between">
                            <span className="font-bold">Kode:</span>
                            <span>{code}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-bold">Nama Voucher:</span>
                            <span>{voucher_name}</span>
                        </p>
                        <p className="mt-2">
                            <span className="font-bold block">Deskripsi:</span>
                            <span className="text-sm block">
                                {voucher_description}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Informasi Pengguna */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-black">Informasi Pengguna</h2>
                    <div className="mt-2">
                        <p className="flex justify-between">
                            <span className="font-bold">Pembeli:</span>
                            <span>
                                {user_name}
                            </span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-bold">Email:</span>
                            <span>
                                {user_email}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Informasi Tanggal */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="flex justify-between">
                        <span className="font-bold">Tanggal Klaim:</span>
                        <span>{claim_date}</span>
                    </p>
                    <p className='flex justify-between'>
                        <span className='font-bold'>Tanggal Redeem:</span>
                        <span>{redeem_date}</span>
                    </p>
                </div>
            </div>

            {/* Tombol */}
            <div className="mt-6 text-center">
                <Link
                    href="/vouchers"
                    className="w-full text-lg font-bold text-white bg-green-500 py-3 border-2 border-black rounded-md hover:bg-green-600 hover:scale-105 transition-transform duration-200 shadow-md block"
                >
                    Kembali
                </Link>
            </div>
        </div>
    );
};

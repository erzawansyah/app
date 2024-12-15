import { createClient } from '@/lib/utils/supabase/supabase-ssr';
import React from 'react';
import Link from 'next/link';

const getVoucherData = async () => {
    const supabase = await createClient();
    const { data: vouchers, error } = await supabase.from('vouchers').select('*');
    if (error) {
        return null;
    }
    return vouchers;
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const ListVouchers = async () => {
    const vouchers = await getVoucherData();
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white border-4 border-black rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide">
                    Vouchers
                </h1>
                <Link
                    href="/crew/vouchers/create"
                    className="bg-primary text-white font-bold text-sm px-4 py-2 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200"
                >
                    Create New
                </Link>
            </div>
            <div className="mt-6 space-y-4">
                {vouchers ? (
                    vouchers.map((voucher) => (
                        <div
                            key={voucher.id}
                            className="p-4 border-2 border-black rounded-md bg-white hover:bg-gray-100 transition-transform duration-200 hover:scale-105"
                        >
                            <h2 className="text-lg font-bold text-black">{voucher.title}</h2>
                            <p className="text-gray-700 mt-2">{voucher.description}</p>
                            <div className="mt-4 text-sm text-gray-500">
                                <p>
                                    Start: <span className="font-medium">{formatDate(voucher.start_date)}</span>
                                </p>
                                <p>
                                    End: <span className="font-medium">{formatDate(voucher.end_date)}</span>
                                </p>
                            </div>
                            <button className="w-full mt-4 bg-primary text-white font-bold text-lg py-2 border-2 border-black rounded-md hover:bg-primary-dark transition-transform duration-200">
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-red-500 text-center text-lg">Failed to fetch vouchers. Please try again later.</p>
                )}
            </div>
        </div>
    );
};

export default ListVouchers;

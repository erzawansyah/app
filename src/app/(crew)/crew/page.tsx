import Link from 'next/link'
import React from 'react'

const CrewDashboard = () => {
    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white border-4 border-black rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide text-center">
                Crew Dashboard
            </h1>

            {/* Menu Voucher */}
            <div className="mt-6 space-y-4">
                <Link
                    href="/crew/vouchers"
                    className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                >
                    Lihat Semua Voucher
                </Link>
                <Link
                    href="/crew/vouchers/create"
                    className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                >
                    Buat Voucher
                </Link>
                <Link
                    href="/crew/vouchers/assign"
                    className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                >
                    Kasih Voucher
                </Link>
            </div>
        </div>
    )
}

export default CrewDashboard

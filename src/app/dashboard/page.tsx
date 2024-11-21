"use client";
import Link from "next/link";
import EventNotification from "@/components/EventNotification";

const Dashboard = () => {
    return (
        <>
            <EventNotification />
            <div className="w-full max-w-md p-6 bg-white border-4 border-black rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide text-center">
                    Dashboard
                </h1>

                <p className="mt-4 text-lg text-gray-dark font-medium text-center">
                    Selamat datang di Dashboard! Pilih menu di bawah untuk melanjutkan.
                </p>

                <div className="mt-6 space-y-4">
                    {/* Menu Voucher */}
                    <Link
                        href="/vouchers"
                        className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                    >
                        Lihat Voucher
                    </Link>

                    {/* Menu Events */}
                    <Link
                        href="/events"
                        className="block w-full text-center bg-white text-primary font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
                    >
                        Lihat Event
                    </Link>

                    {/* Menu Pengaturan */}
                    <Link
                        href="/settings"
                        className="block w-full text-center bg-gray-dark text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-gray-700 hover:scale-105 transition-transform duration-200"
                    >
                        Pengaturan
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

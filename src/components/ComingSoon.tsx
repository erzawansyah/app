"use client";

import Link from "next/link";

interface ComingSoonProps {
    title?: string; // Judul halaman yang akan datang
    redirectUrl?: string; // URL untuk navigasi kembali
}

const ComingSoon: React.FC<ComingSoonProps> = ({
    title = "Halaman Ini Belum Aktif",
    redirectUrl = "/dashboard",
}) => {
    return (
        <>
            <div className="w-full max-w-md p-6 bg-white border-4 border-black rounded-lg shadow-md text-center mx-auto">
                <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide">
                    Coming Soon
                </h1>
                <p className="mt-4 text-lg text-gray-dark font-medium">
                    {title}
                </p>
                <p className="mt-2 text-sm text-gray-dark">
                    Kami sedang bekerja untuk menghadirkan fitur ini secepatnya.
                </p>

                <Link
                    href={redirectUrl}
                    className="mt-6 block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                >
                    Kembali
                </Link>
            </div>
        </>
    );
};

export default ComingSoon;

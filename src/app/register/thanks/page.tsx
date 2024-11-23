"use client";
import Link from 'next/link';

const ThanksPageRegister = () => {
  return (
    <>
      <div className="w-full max-w-md p-6 bg-white border-4 border-black rounded-lg shadow-md text-center mx-auto">
        <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide">
          Terima Kasih!
        </h1>
        <p className="mt-4 text-lg text-gray-dark font-medium">
          Akun Anda telah berhasil didaftarkan. Silakan periksa email Anda untuk
          mengonfirmasi pendaftaran.
        </p>
        <p className="mt-2 text-sm text-gray-dark">
          Jangan lupa untuk memeriksa folder <span className="font-semibold">Inbox</span> atau <span className="font-semibold">Spam/Junk</span>.
        </p>
        <p className="mt-4 text-sm text-gray-dark font-medium">
          Anda juga dapat langsung menutup jendela ini atau masuk ke dashboard untuk melanjutkan.
        </p>
        {/* Request for resend email */}

        <div className="mt-6 space-y-4">
          <Link
            href="/login"
            className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
          >
            Masuk Sekarang
          </Link>
          <Link
            href="/"
            className="block w-full text-center bg-gray-dark text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-gray-700 hover:scale-105 transition-transform duration-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
};

export default ThanksPageRegister;

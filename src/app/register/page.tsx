'use client';

// pages/register.tsx

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

const Register: NextPage = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validasi sederhana
        if (password !== confirmPassword) {
            setError('Password dan Konfirmasi Password harus sama.');
            return;
        }

        router.push('/register/thanks');
        // Tambahkan logika autentikasi atau integrasi backend di sini
    };

    return (
        <>
            <div className="w-full max-w-md p-6 bg-white border-4 border-black rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-center text-black uppercase tracking-wide">
                    Daftar Akun
                </h1>

                {error && (
                    <div className="mt-4 text-center text-red font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="fullname" className="block text-lg font-bold text-black mb-2">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Masukkan nama lengkap Anda"
                            className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-bold text-black mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="whatsapp" className="block text-lg font-bold text-black mb-2">
                            No. Whatsapp
                        </label>
                        <input
                            type="text"
                            id="whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder="Masukkan nomor WhatsApp Anda"
                            className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-bold text-black mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan kata sandi Anda"
                            className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            autoComplete='new-password'
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-lg font-bold text-black mb-2">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Masukkan ulang kata sandi Anda"
                            className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-lg font-bold text-white bg-primary py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                    >
                        Daftar
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-dark">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-bold text-primary hover:underline">
                        Masuk di sini
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Register;

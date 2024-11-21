'use client';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

const Login: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Logika sementara untuk validasi kosong
        if (!email || !password) {
            setError('Email dan Password tidak boleh kosong.');
            return;
        }

        router.push('/dashboard');
    };

    return (
        <>
            <div className="w-full max-w-md p-6 bg-white border-4 border-black rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-center text-black uppercase tracking-wide">
                    Masuk
                </h1>

                {error && (
                    <div className="mt-4 text-center text-red font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                            autoComplete='username'
                            required
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
                            autoComplete='current-password'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-lg font-bold text-white bg-primary py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                    >
                        Masuk
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-dark">
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-bold text-primary hover:underline">
                        Daftar di sini
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;

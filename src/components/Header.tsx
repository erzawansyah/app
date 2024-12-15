'use client';
import Link from 'next/link';
import { useState } from 'react';
import { logout } from '@/actions/logout';
import { Tables } from '@/lib/utils/supabase/database.types';


type NavLink = {
    href: string; // URL tujuan
    label: string; // Teks yang akan ditampilkan
    ariaLabel: string; // Label aksesibilitas (aria-label)
    role: Tables<'profiles'>["approle"][] // Role yang diperlukan untuk mengakses tautan
};
// Konfigurasi untuk tautan navigasi dengan role
const NAV_LINKS: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard', ariaLabel: 'Dashboard', role: ['customer', 'crew', 'manager'] },
    { href: '/vouchers', label: 'Vouchers', ariaLabel: 'Vouchers', role: ['customer', 'crew', 'manager'] },
    { href: '/settings', label: 'Settings', ariaLabel: 'Pengaturan', role: ['customer', 'crew', 'manager'] },
    { href: '/crew', label: 'Crew Dashboard', ariaLabel: 'Admin Panel', role: ['crew'] }, // Contoh tautan khusus admin
];

interface HeaderProps {
    isLoggedIn: boolean;
    profile: Tables<'profiles'> | null;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, profile }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    const getAccessibleLinks = () => {
        // Filter tautan berdasarkan role pengguna
        return NAV_LINKS.filter((link) => {
            return link.role.includes(profile?.approle || 'customer');
        });
    };

    return (
        <header className="bg-primary text-white py-4 px-6 border-b-4 border-black">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    href={isLoggedIn ? '/dashboard' : '/'}
                    className="text-xl font-extrabold uppercase hover:text-gray-200"
                    aria-label="Beranda"
                >
                    Omah Diksi
                </Link>

                {/* Hamburger Menu for Mobile */}
                {isLoggedIn && (
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none hover:text-gray-200"
                            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Navigation Links (Desktop) */}
                {isLoggedIn && (
                    <nav className="hidden md:flex space-x-6 items-center">
                        {getAccessibleLinks().map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                aria-label={link.ariaLabel}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <form action={logout}>
                            <button
                                className="bg-white text-primary font-bold text-sm py-2 px-4 border-2 border-black rounded-md hover:bg-gray-200 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </form>
                    </nav>
                )}
            </div>

            {/* Mobile Menu */}
            {menuOpen && isLoggedIn && (
                <div
                    id="mobile-menu"
                    className="md:hidden mt-4 bg-white text-primary border-2 border-black rounded-md shadow-md"
                >
                    <nav className="flex flex-col items-start p-4 space-y-4">
                        {getAccessibleLinks().map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className="hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                aria-label={link.ariaLabel}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <form action={logout}>
                            <button
                                type='button'
                                className="w-full bg-primary text-white font-bold text-sm py-2 px-4 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </form>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

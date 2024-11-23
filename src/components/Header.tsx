'use client'
import Link from "next/link";
import { useState } from "react";
import { logout } from "@/actions/logout";

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);


    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="bg-primary text-white py-4 px-6 border-b-4 border-black">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    href={isLoggedIn ? "/dashboard" : "/"}
                    className="text-xl font-extrabold uppercase hover:text-gray-200"
                    aria-label="Beranda"
                >
                    Omah Diksi
                </Link>

                {/* Hamburger Menu for Mobile */}
                {isLoggedIn && (
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none hover:text-gray-200"
                            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
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
                        <Link
                            href="/dashboard"
                            className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            aria-label="Dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/vouchers"
                            className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            aria-label="Vouchers"
                        >
                            Vouchers
                        </Link>
                        <Link
                            href="/settings"
                            className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            aria-label="Pengaturan"
                        >
                            Settings
                        </Link>
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
                        <Link
                            href="/dashboard"
                            onClick={closeMenu}
                            className="hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            aria-label="Dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/vouchers"
                            onClick={closeMenu}
                            className="hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            aria-label="Vouchers"
                        >
                            Vouchers
                        </Link>
                        <Link
                            href="/settings"
                            onClick={closeMenu}
                            className="hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            aria-label="Pengaturan"
                        >
                            Settings
                        </Link>
                        <form action={logout}>
                            <button
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

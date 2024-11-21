import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-primary text-white py-4 px-6 border-b-4 border-black" >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-extrabold uppercase">Omah Diksi</h1>
                <nav className="space-x-4">
                    <Link href="/dashboard" className="hover:underline">
                        Dashboard
                    </Link>
                    <Link href="/vouchers" className="hover:underline">
                        Vouchers
                    </Link>
                    <Link href="/settings" className="hover:underline">
                        Settings
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header

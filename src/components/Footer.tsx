import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-dark text-white py-4 px-6 border-t-4 border-black">
            <div className="max-w-7xl mx-auto text-center">
                <p className='text-xs'>&copy; {new Date().getFullYear()} Omah Diksi. Semua Hak Dilindungi.</p>
            </div>
        </footer>
    )
}

export default Footer

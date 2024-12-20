import FormRegister from '@/components/FormRegister';
import type { NextPage } from 'next';
import Link from 'next/link';

const Register: NextPage = () => {
    return (
        <div className="max-w-md mx-auto">
            <FormRegister title="Daftar Akun" />
            <div className="mt-6 text-center text-sm text-gray-dark">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-bold text-primary hover:underline">
                    Masuk di sini
                </Link>
            </div>
        </div>
    );
};

export default Register;

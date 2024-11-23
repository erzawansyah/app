import FormResetPassword from '@/components/FormResetPassword';
import type { NextPage } from 'next';
import Link from 'next/link';

const ResetPassword: NextPage = () => {
    return (
        <div className="max-w-md mx-auto">
            <FormResetPassword title="Ganti Password" />
            <div className="mt-6 text-center text-sm text-gray-dark">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-bold text-primary hover:underline">
                    Masuk di sini
                </Link>
            </div>
        </div>
    );
};

export default ResetPassword;

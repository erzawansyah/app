import FormLogin from '@/components/FormLogin';
import Link from 'next/link';


const Login = () => {
    return (
        <div className="max-w-md mx-auto">
            <FormLogin title='Masuk' />

            <div className="mt-6 text-center text-sm text-gray-dark">
                Belum punya akun?{' '}
                <Link href="/register" className="font-bold text-primary hover:underline">
                    Daftar di sini
                </Link>
            </div>
        </div>
    );
};

export default Login;

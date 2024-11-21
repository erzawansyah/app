import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-gray-light flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white border-4 border-black rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-center text-black uppercase tracking-wide">
          Selamat Datang!
        </h1>
        <p className="mt-4 text-center text-lg text-gray-dark font-medium">
          Ayo kelola voucher kafe Anda dengan mudah dan cepat bersama Omah Diksi.
        </p>

        <div className="mt-6 space-y-4">
          <Link href="/register" className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200">
            Daftar Akun
          </Link>

          <Link href="/login" className="block w-full text-center bg-primary text-white font-bold text-lg py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200">
            Masuk
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-center text-sm text-gray-dark">
            Dengan mendaftar atau masuk, Anda menyetujui{' '}
            <span className="font-semibold underline hover:text-primary cursor-pointer">
              Syarat dan Ketentuan
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

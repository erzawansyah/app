'use client';
import Form from 'next/form';
import { InputText, SubmitButton } from '@/components/FormElements';
import { register } from '@/actions/register';
import { useActionState, useEffect } from 'react'; // Pastikan import benar
import { useState } from 'react';
import { RegisterFormState } from '@/lib/definitions/register';

const FormRegister = ({ title }: { title?: string }) => {
    const [state, action, isPending] = useActionState(register, undefined);
    const [errors, setErrors] = useState<RegisterFormState | undefined>();

    // Jika ada error yang dihasilkan dari action, simpan ke state
    useEffect(() => {
        if (state) {
            setErrors(state);
        }
    }, [state]);


    return (
        <Form
            action={action}
            className="bg-white border-4 border-black rounded-lg shadow-md p-6"
            onChange={() => setErrors(undefined)}
        >
            {title && (
                <h2 className="text-3xl font-extrabold text-center text-black uppercase tracking-wide mb-4">
                    {title}
                </h2>
            )}
            <InputText
                label="Nama Lengkap"
                name="fullname"
                placeholder="Masukan Nama Lengkap Anda"
                autoComplete="name"
                errors={errors?.errors?.fullname}
                required
            />
            <InputText
                label="Email"
                name="email"
                placeholder="Masukkan email Anda"
                required
                autoComplete="email"
                inputType="email"
                errors={errors?.errors?.email}
            />
            <InputText
                label="Nomor WhatsApp"
                name="whatsapp"
                placeholder="Masukkan nomor WhatsApp Anda"
                autoComplete="whatsapp"
                inputType="text"
                errors={errors?.errors?.whatsapp}
            />
            <InputText
                label="Password"
                name="password"
                inputType="password"
                placeholder="Masukkan kata sandi Anda"
                autoComplete="new-password"
                errors={errors?.errors?.password}
                required
            />
            <InputText
                label="Konfirmasi Password"
                name="confirmPassword"
                placeholder="Ulangi kata sandi Anda"
                autoComplete="new-password"
                inputType="password"
                errors={errors?.errors?.confirmPassword}
                required
            />
            <SubmitButton className="mt-4" disabled={isPending}>
                Masuk
            </SubmitButton>
            {errors?.message && (
                <div className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-2">
                    <svg
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                        />
                    </svg>
                    <span>{errors.message}</span>
                </div>
            )}

        </Form>
    );
};

export default FormRegister;

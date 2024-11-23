'use client';
import Form from 'next/form'
import { InputText, SubmitButton } from '@/components/FormElements'
import { login } from '@/actions/login'
import { useActionState, useEffect, useState } from 'react';
import { LoginFormState } from '@/lib/definitions/login';

const FormLogin = ({ title }: { title?: string }) => {
    const [state, action, isPending] = useActionState(login, undefined);
    const [errors, setErrors] = useState<LoginFormState>();

    useEffect(() => {
        if (state) {
            setErrors(state);
        }
    }, [state]);

    const handleFormChange = () => {
        if (errors) {
            setErrors(undefined);
        }
    }

    return (
        <Form action={action} className='bg-white border-4 border-black rounded-lg shadow-md p-6' onChange={handleFormChange}>
            {title &&
                <h2 className="text-3xl font-extrabold text-center text-black uppercase tracking-wide mb-4">
                    {title}
                </h2>
            }
            <InputText
                label="Email"
                name="email"
                placeholder="Masukkan email Anda"
                required
                autoComplete="username"
                inputType="email"
                errors={errors?.errors?.email}
            />
            <InputText
                label="Password"
                name="password"
                placeholder="Masukkan kata sandi Anda"
                required
                autoComplete="current-password"
                inputType="password"
                errors={errors?.errors?.password}
            />
            <SubmitButton className='mt-4'
                disabled={isPending}
            >Masuk</SubmitButton>
            {errors?.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </Form>
    )
}

export default FormLogin

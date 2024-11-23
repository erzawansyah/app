'use client';
import Form from 'next/form'
import { HiddenField, InputText, SubmitButton } from '@/components/FormElements'
import { resetPassword } from '@/actions/resetPassword'
import { useActionState, useEffect, useState } from 'react';
import { ResetPaasswordState } from '@/lib/definitions/resetPassword';

const FormResetPassword = ({ title }: { title?: string }) => {
    const [state, action, isPending] = useActionState(resetPassword, undefined);
    const [errors, setErrors] = useState<ResetPaasswordState>();

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
            <HiddenField name="email" value={`email_pengguna_dari_query_params`} />
            <InputText
                label="Password Baru"
                name="password"
                placeholder="Masukkan kata sandi baru Anda"
                autoComplete='new-password'
                inputType="password"
                errors={errors?.errors?.password}
                required
            />
            <InputText
                label="Konfirmasi Password"
                name="confirmPassword"
                placeholder="Konfirmasi kata sandi baru Anda"
                autoComplete='new-password'
                inputType="password"
                errors={errors?.errors?.confirmPassword}
                required
            />
            <SubmitButton className='mt-4'
                disabled={isPending}
            >Ganti Password</SubmitButton>
            {errors?.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </Form>
    )
}

export default FormResetPassword

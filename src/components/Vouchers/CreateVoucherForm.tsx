import React, { useActionState, useEffect, useState } from 'react'
import { FileInput, InputText, SubmitButton } from '../FormElements'
import Form from 'next/form'
import { createVouchers } from '@/actions/create_voucher';
import { CreateVoucherFormState } from '@/lib/definitions/create_voucher.types';

const CreateVoucherForm = () => {
    const [state, action, isPending] = useActionState(createVouchers, undefined);
    const [errors, setErrors] = useState<CreateVoucherFormState | undefined>();

    // Jika ada error yang dihasilkan dari action, simpan ke state
    useEffect(() => {
        if (state) {
            setErrors(state);
        }
    }, [state]);

    return (
        <Form
            action={action}
            className="mt-6 space-y-4"
            onChange={() => setErrors(undefined)}
        >
            {/* Title */}
            <InputText
                required
                label="Title"
                name="title"
                inputType="text"
                placeholder='Enter the title of the voucher'
                defaultValue=""
                errors={errors?.errors?.title}
            />

            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-lg font-bold text-black mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 mb-1 focus:ring-primary"
                    rows={8}
                    placeholder='Enter the description of the voucher. You can use markdown here.'
                ></textarea>
                {errors?.errors?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.errors.description[0]}</p>
                )}
            </div>

            {/* Image URL */}
            <FileInput
                label="Upload Dokumen"
                name="image"
                errors={errors?.errors?.image}
            />

            {/* Prefix */}
            <InputText
                label="Prefix"
                name="prefix"
                inputType="text"
                defaultValue=""
                placeholder='Enter the prefix of the voucher'
                errors={errors?.errors?.prefix}
            />

            {/* Start Date */}
            <InputText
                required
                label="Start Date"
                name="start_date"
                inputType="datetime-local"
                defaultValue=""
                errors={errors?.errors?.start_date}
            />

            {/* End Date */}
            <InputText
                required
                label="End Date"
                name="end_date"
                inputType="datetime-local"
                defaultValue=""
                errors={errors?.errors?.end_date}
            />

            {/* Max Claim */}
            <InputText
                required
                label="Max Claim"
                name="max_claim"
                inputType="number"
                defaultValue="1"
                placeholder='Enter the maximum claim of the voucher'
            />

            {/* Submit Button */}
            <SubmitButton
                className="mt-8"
                disabled={isPending}
            >Create Voucher</SubmitButton>
        </Form>
    )
}

export default CreateVoucherForm

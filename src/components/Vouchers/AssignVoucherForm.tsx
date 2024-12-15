'use client';
import React, { useActionState, useEffect, useState } from 'react';
import { InputText, SubmitButton } from '@/components/FormElements';
import { AutoSelectInput, CustomSelect } from '@/components/FormElements';
import { supabaseClient as supabase } from '@/lib/utils/supabase/supabase';
import { Tables } from '@/lib/utils/supabase/database.types';
import Form from 'next/form';
import { assignVouchers } from '@/actions/assign_voucher';
import { AssignVoucherFormState } from '@/lib/definitions/assign.types';

type User = Tables<'profiles'>;
type UserDetail = Pick<User, 'id' | 'fullname' | 'email_address'>;
type Voucher = Tables<'vouchers'>;
type VoucherDetail = Pick<Voucher, 'id' | 'title' | 'prefix'>;

type FormState = {
    voucher: VoucherDetail;
    user: UserDetail | null;
    quantity: number;
};

const AssignVoucherForm = () => {
    const [state, action, isPending] = useActionState(assignVouchers, undefined);
    const [formData, setFormData] = useState<FormState>({
        voucher: {
            id: '',
            title: '',
            prefix: '',
        },
        user: null,
        quantity: 1,
    });
    const [vouchers, setVouchers] = useState<VoucherDetail[]>([]);
    const [errors, setErrors] = useState<AssignVoucherFormState | undefined>();

    // Fetch active vouchers on mount
    useEffect(() => {
        fetchActiveVouchers().then((vouchers) => {
            if (vouchers) {
                setVouchers(vouchers);
            }
        });

    }, []);

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
            {/* Voucher Select */}
            <div>
                <CustomSelect
                    name='voucherId'
                    value={formData.voucher.id}
                    onChange={(value) => setFormData({
                        ...formData,
                        voucher: vouchers.find((voucher) => voucher.id === value) || formData.voucher,
                    })}
                    options={vouchers}
                    displayProperty="title"
                    valueProperty="id"
                    placeholder="Select a voucher"
                    errors={errors?.errors?.voucherId}
                />
            </div>

            {/* User AutoSelectInput */}
            <div>
                <AutoSelectInput
                    name='userId'
                    value={formData.user}
                    onChange={(selectedUser) =>
                        setFormData({
                            ...formData,
                            user: selectedUser,
                        })
                    }
                    onSelect={(user) =>
                        setFormData({
                            ...formData,
                            user,
                        })
                    }
                    fetchSuggestions={fetchUserSuggestions}
                    placeholder="Search for a user..."
                    displayProperty="fullname"
                    labelProperty='email_address'
                    errors={errors?.errors?.userId}
                />

            </div>

            {/* Quantity Input */}
            <InputText
                label="Quantity"
                name="quantity"
                inputType="number"
                value={formData.quantity}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        quantity: parseInt(e.target.value, 10),
                    })
                }
                placeholder="Enter quantity"
                errors={errors?.errors?.quantity}
            />

            {/* Submit Button */}
            <SubmitButton className="mt-4" disabled={isPending}>Kirim Voucher</SubmitButton>
            {errors?.message && (
                <div className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-2">
                    <div className="text-lg font-bold">Error</div>
                    <div className="ml-2 text-sm">{errors.message}</div>
                </div>
            )}
        </Form>
    );
};

export default AssignVoucherForm;


// Fetch user suggestions
const fetchUserSuggestions = async (query: string): Promise<UserDetail[]> => {
    const combinedQuery = `fullname.ilike.%${query}%,email_address.ilike.%${query}%`;
    const { data: users, error } = await supabase
        .from('profiles')
        .select('id, fullname, email_address')
        .or(combinedQuery);
    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    return users;
};

const fetchActiveVouchers = async () => {
    const { data: vouchers, error } = await supabase
        .from('vouchers')
        .select('id, title, prefix')
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString());
    if (error) {
        console.error('Error fetching vouchers:', error);
        return;
    }
    return vouchers;
};

'use client'
import { supabaseClient as supabase } from '@/lib/utils/supabase/supabase'
import React, { useState } from 'react'

interface RedeemConfirmationButtonProps {
    code: string;
}


const RedeemConfirmationButton: React.FC<RedeemConfirmationButtonProps> = ({
    code
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleClick = async () => {
        setIsSubmitting(true)
        setError(null)

        const { error } = await supabase.rpc('redeem_voucher_by_code', {
            p_voucher_code: code,
        })
        if (error) {
            setError(error.message)
        }
        setIsSubmitting(false)
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }


    return (
        <div>
            <button
                type='button'
                onClick={handleClick}
                disabled={isSubmitting}
                className="w-full text-lg font-bold text-white bg-primary py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-transform duration-200 shadow-md"
            >
                {
                    isSubmitting ? 'Redeeming...' : 'Redeem'
                }
            </button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default RedeemConfirmationButton

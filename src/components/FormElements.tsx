'use client';
import { InputTextProps, SubmitButtonProps } from '@/lib/definitions/form';
import { ButtonHTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge'


export const HiddenField = ({ name, value }: { name: string, value: string }) => {
    return (
        <input type="hidden" name={name} value={value} />
    )
}

export const InputText: React.FC<InputTextProps> = ({
    label,
    name,
    inputType = 'text',
    defaultValue = '',
    className = {
        container: 'mb-4',
        label: 'block text-lg font-bold text-black mb-2',
        input: 'w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 mb-1 focus:ring-primary',
    },
    errors = undefined,
    ...rest
}) => {
    const defaultClassName = {
        container: 'mb-4',
        label: 'block text-lg font-bold text-black mb-2',
        input: 'w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 mb-1 focus:ring-primary',
    };

    const [state, setState] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value); // Perbarui state lokal
        if (rest.onChange) {
            rest.onChange(e); // Panggil handler onChange yang diteruskan sebagai prop
        }
    };

    return (
        <div className={twMerge(defaultClassName.container, className?.container)}>
            {label && (
                <label htmlFor={name} className={twMerge(defaultClassName.label, className?.label)}>
                    {label}
                </label>
            )}
            <input
                type={inputType}
                id={name}
                name={name}
                value={state || ''}
                className={twMerge(
                    defaultClassName.input,
                    errors ? 'border-red-500 focus:ring-red-500' : '',
                    className?.input
                )}
                onChange={handleChange}
                {...rest}
            />
            {/* Tampilkan pesan error */}
            {typeof errors === 'string' && (
                <p className="text-red-500 text-sm mt-1">{errors}</p>
            )}
            {Array.isArray(errors) && (
                <ul className="text-red-500 text-sm mt-1">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export const SubmitButton = ({ children, className, ...props }: SubmitButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            type="submit"
            className={twMerge('w-full text-lg font-bold text-white bg-primary py-3 border-2 border-black rounded-md hover:bg-primary-dark hover:scale-105 transition-all duration-200 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed', className)}
            {...props}
        >
            {children}
        </button>
    )
}

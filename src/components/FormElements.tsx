'use client';
import { CustomSelectProps, InputTextProps, SubmitButtonProps } from '@/lib/definitions/form';
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
    required = false,
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
                    {label} {required && <span className="text-red-500">*</span>}
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


export const FileInput: React.FC<{
    label: string;
    name: string;
    className?: {
        container?: string;
        label?: string;
        input?: string;
    };
    errors?: string | string[];
    required?: boolean;
    onChange?: (file: File | null) => void;
}> = ({
    label,
    name,
    className = {
        container: 'mb-4',
        label: 'block text-lg font-bold text-black mb-2',
        input: 'w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 mb-1 focus:ring-primary',
    },
    errors = undefined,
    required = false,
    onChange,
}) => {
        const defaultClassName = {
            container: 'mb-4',
            label: 'block text-lg font-bold text-black mb-2',
            input: 'w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 mb-1 focus:ring-primary',
        };

        const [selectedFile, setSelectedFile] = useState<File | null>(null);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] || null;
            setSelectedFile(file); // Simpan file ke state lokal
            if (onChange) {
                onChange(file); // Panggil handler onChange yang diteruskan sebagai prop
            }
        };

        return (
            <div className={twMerge(defaultClassName.container, className?.container)}>
                {label && (
                    <label htmlFor={name} className={twMerge(defaultClassName.label, className?.label)}>
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <input
                    type="file"
                    id={name}
                    name={name}
                    className={twMerge(
                        defaultClassName.input,
                        errors ? 'border-red-500 focus:ring-red-500' : '',
                        className?.input
                    )}
                    onChange={handleFileChange}
                />
                {selectedFile && (
                    <p className="mt-2 text-sm text-gray-700">File dipilih: {selectedFile.name}</p>
                )}
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

type AutoSelectInputProps<T> = {
    name: string;
    value: T | null;
    onChange: (value: T | null) => void;
    onSelect: (item: T) => void;
    fetchSuggestions: (query: string) => Promise<T[]>;
    placeholder?: string;
    displayProperty: keyof T;
    labelProperty?: keyof T;
    errors?: string | string[];
};

export const AutoSelectInput = <T extends { id: string }>({
    name,
    value,
    onChange,
    onSelect,
    fetchSuggestions,
    placeholder = 'Search...',
    displayProperty,
    labelProperty,
    errors,
}: AutoSelectInputProps<T>) => {
    const [inputValue, setInputValue] = useState<string>(value ? (value[displayProperty] as string) : '');
    const [suggestions, setSuggestions] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        // Reset suggestions if input is cleared]
        setInputValue(query);

        if (!query.trim()) {
            setSuggestions([]);
            setLoading(false);
            setNotFound(false);
            onChange(null); // Clear the selected value when input is cleared
            if (typingTimeout) clearTimeout(typingTimeout);
            return;
        }

        setLoading(true);

        // Debounce fetchSuggestions call
        if (typingTimeout) clearTimeout(typingTimeout);
        const timeout = setTimeout(async () => {
            const results = await fetchSuggestions(query);
            setSuggestions(results);
            setLoading(false);
            setNotFound(results.length === 0);
        }, 2000); // 2 seconds debounce

        setTypingTimeout(timeout);
    };

    const handleSelect = (item: T) => {
        onSelect(item); // Notify parent about selection
        onChange(item); // Update the selected value
        setInputValue(item[displayProperty] as string); // Update input with selected item
        setSuggestions([]); // Clear suggestions
        setNotFound(false); // Reset notFound
    };

    return (
        <div className="relative">
            <HiddenField name={name} value={value?.id || ''} />
            <label htmlFor={`${name}-input`} className="block text-lg font-bold text-black mb-2">
                User
            </label>
            <input
                name={`${name}-input`}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                {loading && <div className="px-4 py-2 text-center text-gray-500">Loading...</div>}
                {!loading && notFound && (
                    <div className="px-4 py-2 text-center text-gray-500">No items found.</div>
                )}
                {!loading &&
                    suggestions.map((item) => (
                        <div
                            key={item.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(item)}
                        >
                            <div className="font-bold">{item[displayProperty] as string}</div>
                            {
                                labelProperty && <div className="text-sm text-gray-500">{item[labelProperty] as string}</div>
                            }
                        </div>
                    ))}
            </div>
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

export const CustomSelect = <T extends { id: string }>({
    name,
    value,
    onChange,
    options,
    displayProperty,
    valueProperty,
    placeholder = 'Select an option',
    errors,
}: CustomSelectProps<T>) => {
    return (
        <div>
            <label htmlFor={`${name}-select`} className="block text-lg font-bold text-black mb-2">
                Voucher
            </label>
            <HiddenField name={name} value={value as string} />
            <select
                name={`${name}-select`}
                title={`${name}-select`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option[valueProperty] as string | number}>
                        {option[displayProperty] as string}
                    </option>
                ))}
            </select>
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

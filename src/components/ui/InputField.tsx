import { cn } from '@/lib/utils';
import React from 'react';
import { FieldError } from 'react-hook-form';

type InputFieldProps = {
    label?: string;
    id: string;
    register: any;
    error?: FieldError | null;
};

const InputField: React.FC<InputFieldProps> = ({ label, id, register, error }) => {

    const hasErrors = error != null

    const inputClassName = cn(
        "border-2 rounded-md w-full",
        { "border-2 border-red-500 focus:border-red-500 focus:ring-red-500": hasErrors },
    )

    return (
        <div className="w-full flex gap-3">
            {label && <label htmlFor={id}>{label}:</label>}
            <div className='flex flex-col'>
                <input className={inputClassName} id={id} {...register} />
                {error && <div className="text-red-500 text-sm" >{error.message}</div>}
            </div>
        </div>
    );
};

export default InputField;
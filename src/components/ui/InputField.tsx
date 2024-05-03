import { cn } from '@/lib/utils';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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
        <div className="grid w-full max-w-sm items-center gap-1.5">
            {label && <Label htmlFor={id}>{label}:</Label>}
            <Input type="email" id="email" placeholder="Email" />
            {error && <div className="text-red-500 text-sm" >{error.message}</div>}
        </div>
    );
};

export default InputField;
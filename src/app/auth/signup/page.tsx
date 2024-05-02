"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // Import Zod
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "@/components/ui/InputField"

//Should be imported from the types file.
type User = {
    name: string,
    email: string,
    password: string,
}

//Define the schema for the form
const userSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string()
        .min(6)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter and one digit'),
});


const SignUpPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>({
        resolver: zodResolver(userSchema),
    });

    //Function that handles submision of validated data
    const onSubmit = async (data: User) => {
        console.log(data);
        // Submit the data to your API or perform any other action
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Name" id="name" register={register("name")} error={errors.name} />
                <InputField label="Email" id="email" register={register("email")} error={errors.email} />
                <InputField label="Password" id="password" register={register("password")} error={errors.password} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;

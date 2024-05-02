"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // Import Zod
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "@/components/ui/InputField"
import { useUsersMutation } from '@/redux/features/users/usersApiSlice';


//Should be imported from the types file.
type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string,
}
//initialising useUsersMutation 
const [registerUser , {isLoading}] = useUsersMutation()

//Define the schema for the form
const userSchema = z
	.object({
		frist_name: z.string().min(2).max(50),
		last_name: z.string().min(2).max(50),
		email: z.string().email(),
		password: z
			.string()
			.min(6)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
				"Password must contain at least one uppercase letter and one digit"
			),
		re_password: z.string(),
	})
	.refine((data) => data.password === data.re_password, {
		message: "Passwords don't match",
		path: ["re_password"],
	});


const SignUpPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>({
        resolver: zodResolver(userSchema),
    });

    //Function that handles submision of validated data
    const onSubmit = async (data: User) => {
        console.log(data);
        // Submit the data to your API or perform any other action
        registerUser(data).unwrap()
        .then(
            // todo add toast component (redirect to email for activation)
        )
        .catch( error => console.log(error))
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Frist Name" id="first_name" register={register("first_name")} error={errors.first_name} />
                <InputField label="Last Name" id="last_name" register={register("last_name")} error={errors.last_name} />
                <InputField label="Email" id="email" register={register("email")} error={errors.email} />
                <InputField label="Password" id="password" register={register("password")} error={errors.password} />
                <InputField label="Confirm Password" id="re_password" register={register("password")} error={errors.password} />
                <button type="submit" disabled={isLoading}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;

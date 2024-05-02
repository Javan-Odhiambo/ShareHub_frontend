"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import { useJwtCreateMutation } from "@/redux/features/auth/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/auth/authSlice";

//Should be imported from the types file.
type LoginDetails = {
	email: string;
	password: string;
};

//Define the schema for the form
const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
			"Password must contain at least one uppercase letter and one digit"
		),
});

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDetails>({
		resolver: zodResolver(loginSchema),
	});
    
    //initializing the mutation to handle loggin in
    const [useLogin, { isLoading }] = useJwtCreateMutation()
    //initializing app dispatch to dispatch action on success
    const dispatch = useAppDispatch()

	//Function that handles submision of validated data
	const onSubmit = async (data: LoginDetails) => {
		console.log(data);
		// Submit the data to your API or perform any other action
        useLogin(data)
			.unwrap()
			.then((response) => {
				//check format of response isJson? => parse or use as is
				console.log(response);
				//dispatch Login action to handle setting state
                dispatch(login(response))
                
				
			})
			.catch((error) => console.log(error));

	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label="Email"
					id="email"
					register={register("email")}
					error={errors.email}
				/>
				<InputField
					label="Password"
					id="password"
					register={register("password")}
					error={errors.password}
				/>
				<button type="submit" disabled={isLoading} >Login</button>
			</form>
		</div>
	);
};

export default LoginPage;

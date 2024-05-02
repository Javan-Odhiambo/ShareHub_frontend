"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import { useResetPasswordConfirmMutation } from "@/redux/features/users/usersApiSlice";

//Should be imported from the types file.
type ResetPassword = {
	password: string;
	re_password: string;
};

interface Params {
	uid:string;
	token:string;
}

//Define the schema for the form
const ResetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(6)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
				"Password must contain at least one uppercase letter and one digit"
			),
		re_password: z.string()
	})
	.refine((data) => data.password === data.re_password, {
		message: "Passwords don't match",
		path: ["re_password"],
	});

const ResetPasswordPage = ( params: Params ) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPassword>({
		resolver: zodResolver(ResetPasswordSchema),
	});
	// retrieve uid and token from params
	const { uid, token } = params;
	// initialize usereset password mutation
	const [ resetPassword, {isLoading}] = useResetPasswordConfirmMutation()

	//Function that handles submision of validated data
	const onSubmit = async (data: ResetPassword) => {
		console.log(data);
		// Submit the data to your API or perform any other action
		const requestDetails = {
			uid:uid,
			token:token,
			...data,
		}
		resetPassword(requestDetails).unwrap()
		.then(
			// todo redirect and toast notification
		)
		.catch((error) => console.log(error))

	};

	return (
		<div>
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label="Password"
					id="password"
					register={register("password")}
					error={errors.password}
				/>
				<InputField
					label="Confirm Password"
					id="re_password"
					register={register("re_password")}
					error={errors.password}
				/>
				<button type="submit">Reset Password</button>
			</form>
		</div>
	);
};

export default ResetPasswordPage;

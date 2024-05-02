"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import { useResetPasswordMutation } from "@/redux/features/users/usersApiSlice";


//Should be imported from the types file.
type ForgotPassword = {
	email: string;
};

//Define the schema for the form
const ForgotPasswordShema = z.object({
	email: z.string().email(),
});

const ResetPasswordPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPassword>({
		resolver: zodResolver(ForgotPasswordShema),
	});
	// initialiising useResetPassowrd mutation
	const [resetPassword , { isLoading }] = useResetPasswordMutation()

	//Function that handles submision of validated data
	const onSubmit = async (data: ForgotPassword) => {
		console.log(data);
		// Submit the data to your API or perform any other action
		resetPassword(data).unwrap()
		.then(
			// todo show toast component(check email for link) and redirect to reset-password page
		)
		.catch(error => console.log(error))

	};

	return (
		<div>
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label="Email"
					id="email"
					register={register("email")}
					error={errors.email}
				/>
				<button type="submit">Reset Password</button>
			</form>
		</div>
	);
};

export default ResetPasswordPage;

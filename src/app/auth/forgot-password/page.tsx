"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
	const form = useForm<ForgotPassword>({
		resolver: zodResolver(ForgotPasswordShema),
	});
	// * initialiising useResetPassowrd mutation
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	//* initializing toast
	const { toast } = useToast();

	// * Function that handles submision of validated data
	const onSubmit = async (data: ForgotPassword) => {
		console.log(data);
		// * Submit the data to your API or perform any other action
		resetPassword(data)
			.unwrap()
			.then(() => {
				toast({
					title: "Sent successfully",
					description: "Check your email for password reset link",
				});
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="max-w-[500px] w-[400px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border py-9 px-4 rounded-2xl">
			<h1 className="text-xl font-semibold text-center">
				Reset Password
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email </FormLabel>
								<FormControl>
									<Input
										placeholder="email"
										{...field}
									/>
								</FormControl>
								<FormDescription> </FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default ResetPasswordPage;

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import { useResetPasswordConfirmMutation } from "@/redux/features/users/usersApiSlice";
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

//Should be imported from the types file.
type ResetPassword = {
	new_password: string;
	re_new_password: string;
};

interface Params {
	uid: string;
	token: string;
}

//Define the schema for the form
const ResetPasswordSchema = z
	.object({
		new_password: z
			.string()
			.min(6)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
				"Password must contain at least one uppercase letter and one digit"
			),
		re_new_password: z.string(),
	})
	.refine((data) => data.new_password === data.re_new_password, {
		message: "Passwords don't match",
		path: ["re_new_password"],
	});

const ResetPasswordPage = ({ params }: { params: Params }) => {
	const form = useForm<ResetPassword>({
		resolver: zodResolver(ResetPasswordSchema),
	});
	// retrieve uid and token from params
	const { uid, token } = params;
	// initialize usereset password mutation
	const [resetPassword, { isLoading }] = useResetPasswordConfirmMutation();

	//initialize toast
	const { toast } = useToast();

	//Function that handles submision of validated data
	const onSubmit = async (data: ResetPassword) => {
		console.log({ uid, token, ...data });
		// Submit the data to your API or perform any other action

		resetPassword({ uid, token, ...data })
			.unwrap()
			.then(() => {
				toast({
					description: "Password reset successfully",
				});
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="max-w-[500px] w-[400px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border py-9 px-4 rounded-2xl">
			<h1 className="text-xl font-semibold text-center">Reset</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="new_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="password"
										{...field}
									/>
								</FormControl>
								<FormDescription> </FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="re_new_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Confirm Password"
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

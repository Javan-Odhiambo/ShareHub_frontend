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
import { useRouter } from "next/navigation";
import { useJwtCreateMutation } from "@/redux/features/auth/authApiSlice";
import { setAuth } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";

//Should be imported from the types file.
type LoginDetails = {
	email: string;
	password: string;
};

//Define the schema for the form
const loginSchema = z.object({
	email: z.string({
		required_error: "Email is required",
	}).email(),
	password: z.string({
			required_error: "Password is required",
		}
	).min(6, {
		message: "Password should be at least 6 characters",
	}
	)
});

const LoginPage = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});

	//* initializing the mutation to handle loggin in
	const [useLogin, { isLoading }] = useJwtCreateMutation();

	//* initializing app dispatch to dispatch action on success
	const dispatch = useAppDispatch();

	//* initializing toast
	const { toast } = useToast();
	const router = useRouter();

	//* Function that handles submision of validated data
	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		console.log(data);
		//* Submit the data to your API or perform any other action
		useLogin(data)
			.unwrap()
			.then(() => {

				dispatch(setAuth());
				toast({
					title: "Login success",
					description: "redirecting you to the home page",
				});
				router.push("/dashboard");

			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="max-w-[500px] w-[400px] left-1/2 -translate-x-1/2 absolute top-1/2 -translate-y-1/2  border py-9 px-4 rounded-2xl">
			<h1 className="text-xl font-semibold text-center">Login</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Email </FormLabel>
								<FormControl>
									<Input placeholder="email" {...field} />
								</FormControl>
								<FormDescription> </FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="password" {...field} />
								</FormControl>
								<FormDescription> </FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Login</Button>
					<Link
						href="/auth/forgot-password"
						className="text-sm text-blue-500 underline block"
					>
						Forgot password ?
					</Link>
					<Link href="/auth/signup" className="text-sm text-blue-500 block mt-3">
						Don't have an account?
						<span className="underline text-stone-900 px-1">SignUp</span>
					</Link>
				</form>
			</Form>
		</div>
	);
};

export default LoginPage;

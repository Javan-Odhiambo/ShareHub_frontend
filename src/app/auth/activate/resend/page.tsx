"use client";
import React from "react";
import { useUsersResendActivationMutation } from "@/redux/features/users/usersApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
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

const resendActivationSchema = z.object({
	email: z.string().email(),
});

const Page = () => {

	const form = useForm<z.infer<typeof resendActivationSchema>>({
		resolver: zodResolver(resendActivationSchema),
	});

	// * initializing the mutation
	const [resendActivation, { isLoading }] = useUsersResendActivationMutation();

	// * initializing toast
	const { toast } = useToast();

	const onSubmit = (data: z.infer<typeof resendActivationSchema>) => {
		// * submit the data via request;
		resendActivation(data)
			.unwrap()
			.then(() => {
				toast({
					title: "Email has been resent",
					description:"Check your email again"
				});
			})
			.catch((error) => {
				console.log(error);
				toast({
					title: "Something went wrong",
					description: "Your email has not been resent",
				});
			});
	};
	//
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="example@gmail.com"
										{...field}
									/>
								</FormControl>
								<FormDescription> </FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Resend</Button>
				</form>
			</Form>
		</div>
	);
};

export default Page;

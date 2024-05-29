"use client";
import React from "react";
import { useUsersRestEmailConfirmMutation } from "@/redux/features/users/usersApiSlice";
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

interface Params {
	uid: string;
	token: string;
}

type ResetEmailConfirm = {
	email: string;
	re_new_email: string;
};

const ResetEmailConfirmSchema = z
	.object({
		email: z
			.string({
				required_error: "Email is required",
			})
			.email(),
		re_new_email: z
			.string({
				required_error: "Email confirmation is required",
			})
			.email(),
	})
	.refine((data) => data.email === data.re_new_email, {
		message: "Emails must match",
		path: ["re_new_email"],
	});

const Page = ({ params }: { params: Params }) => {
	const form = useForm<z.infer<typeof ResetEmailConfirmSchema>>({
		resolver: zodResolver(ResetEmailConfirmSchema),
	});

	// * retrieve uid and token from params
	const uid = params.uid;
	const token = params.token;

	// * initializing the mutation
	const [resetEmailConfirm, { isLoading }] = useUsersRestEmailConfirmMutation();

	// * initializing toast
	const { toast } = useToast();

	const onSubmit = (data: z.infer<typeof ResetEmailConfirmSchema>) => {
		// * submit the data via request;
		resetEmailConfirm({ uid, token, ...data })
			.unwrap()
			.then(() => {
				toast({
					title: "Email has been reset successfully",
				});
			})
			.catch((error) => {
				console.log(error);
				toast({
					title: "Something went wrong",
					description: "Your email has not been reset",
				});
			});
	};
	//
	return (
		<div className="max-w-[500px] w-[400px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border py-9 px-4 rounded-2xl">
			<h1 className="text-xl font-semibold text-center">Reset</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Email</FormLabel>
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

					<FormField
						control={form.control}
						name="re_new_email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Confirm email</FormLabel>
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
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default Page;

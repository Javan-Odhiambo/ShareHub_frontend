"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useInnovationsCreateMutation } from "@/redux/features/innovations/innovationsApiSlice";
import RequireAuth from "@/redux/features/auth/RequireAuth";

//Define the schema for the form
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const InnovationSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().min(2),
	category: z.string().min(1).max(3),
	status: z.string().min(1).max(3),
	co_authors: z.string().min(2).max(50),
	banner_image: z
		.instanceof(FileList)
		.refine((file) => file?.length == 1, "File is required."),
	// .optional()
	// .refine((file) => {
	// 	return !file || file.size <= MAX_UPLOAD_SIZE;
	// }, "File size must be less than 3MB"),

	//banner_image
});
type Innovation = z.infer<typeof InnovationSchema>;

const InnovationPage = () => {
	const form = useForm<Innovation>({
		resolver: zodResolver(InnovationSchema),
	});

	const [createInovation, { isLoading }] = useInnovationsCreateMutation();

	//initialize toast
	const { toast } = useToast();

	//Function that handles submision of validated data
	const onSubmit = async (data: Innovation) => {
		console.log(data);
		// fetch("http://localhost:8000/api/innovations/", {
		// 	method: "POST",
		// 	credentials: "include",
		// 	body: { ...data },
		// 	headers:{
		// 		"content-type":"multipart/form-data"
		// 	}
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			return res.json();
		// 		} else {
		// 			throw new Error();
		// 		}
		// 	})
		// 	.then((data) => {
		// 		console.log(data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		// Submit the data to your API or perform any other action
		// createInovation(data)
		// 	.unwrap()
		// 	.then((response) => {
		// 		// toast created successfully
		// 		toast({
		// 			title: "Innovation Created successfully",
		// 			description:
		// 				"You can now view you innovation in your profile",
		// 		});
		// 		console.log(response);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	};

	const fileRef = form.register("banner_image");

	return (
		// <RequireAuth>
		<div className="px-5 md:px-20">
			<h1 className="font-semibold text-lg text-center my-5">
				Create a New Innovation
			</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
					encType="multipart/form-data"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Innovation Title" {...field} />
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="co_authors"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Co Authors</FormLabel>
								<FormControl>
									<Input placeholder="Co Authors" {...field} />
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Cancer">Cancer</SelectItem>
										<SelectItem value="H">HIV</SelectItem>
										<SelectItem value="COVID-19">COVID-19</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select innovation status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="P">Published</SelectItem>
										<SelectItem value="D">Draft</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="banner_image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Banner image</FormLabel>
								<FormControl>
									<Input
										type="file"
										placeholder="banner_image"
										{...fileRef}
										// onChange={(event) => {
										// 	field.onChange(
										// 		event.target.files?.[0] ??
										// 			undefined
										// 	);
										// }}
									/>
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tell us more about the Innovation..."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{/* You can <span>@mention</span> other users and organizations to
							link to them. */}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button size={"lg"} type="submit">
						Create
					</Button>
				</form>
			</Form>
		</div>
		// </RequireAuth>
	);
};

export default InnovationPage;

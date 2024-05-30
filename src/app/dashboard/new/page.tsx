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
import { FileInput } from "@/components/ui/FileInput";
import { useRouter } from "next/navigation";

const isBrowser = typeof window !== "undefined";
const FileListType = isBrowser ? FileList : Array;

//Define the schema for the form
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const InnovationSchema = z.object({
	title: z
		.string({
			required_error: "Title is required",
		})
		.min(2)
		.max(50),
	description: z
		.string({
			required_error: "Description is required",
		})
		.min(2),
	status: z
		.string({
			required_error: "Status is required",
		})
		.min(1)
		.max(3),
	dashboard_type: z.string().min(1).max(3).optional(),
	// banner_image: z
	//   .instanceof(FileListType)
	//   .optional()
	//   .refine((file) => file == null || file?.length == 1, "File is required."),

	//banner_image
	dashboard_link: z
		.string({
			required_error: "Dashboard Link is required",
		})
		.url(),
	dashboard_id: z.string().url().optional(),
	dashboard_image: z
		.instanceof(FileListType)
		.optional()
		.refine((file) => file == null || file?.length == 1, "File is required."),
	dashboard_definitions: z
		.instanceof(FileListType)
		.optional()
		.refine((file) => file == null || file?.length == 1, "File is required."),
});
type Innovation = z.infer<typeof InnovationSchema>;

const InnovationPage = () => {
	const router = useRouter();

	const form = useForm<Innovation>({
		resolver: zodResolver(InnovationSchema),
	});

	const [createInovation, { isLoading }] = useInnovationsCreateMutation();

	//initialize toast
	const { toast } = useToast();

	//Function that handles submision of validated data
	const onSubmit = async (data: Innovation) => {
		// Submit the data to your API or perform any other action
		createInovation(data)
			.unwrap()
			.then((response) => {
				// toast created successfully
				toast({
					title: "Innovation Created successfully",
					description: "redirecting you to the home page",
				});
				form.reset();
				router.push("/dashboard");
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
								<FormLabel className="required">Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Innovation Title"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
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
								<FormLabel className="required">Status</FormLabel>
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
						name="dashboard_type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Dashboard Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select innovation type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="S">Superset</SelectItem>
										<SelectItem value="M">Metabase</SelectItem>
										<SelectItem value="P">Power BI</SelectItem>
										<SelectItem value="O">Other</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* <FormField
            control={form.control}
            name="banner_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Banner image</FormLabel>
                <FileInput {...form.register("banner_image")} />
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tell us more about the Innovation..."
										{...field}
										value={field.value || ""}
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

					<FormField
						control={form.control}
						name="dashboard_link"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Dashboard Link</FormLabel>
								<FormControl>
									<Input
										placeholder="Dashboard Link"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dashboard_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel >Dashboard Embed id</FormLabel>
								<FormControl>
									<Input
										placeholder="Dashboard embed id"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dashboard_image"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Dashboard image</FormLabel>
								<FileInput {...form.register("dashboard_image")} />
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dashboard_definitions"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="required">Dashboard Definition</FormLabel>
								<FileInput {...form.register("dashboard_definitions")} />
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button size={"lg"} type="submit" disabled={isLoading}>
						Create
					</Button>
				</form>
			</Form>
		</div>
		// </RequireAuth>
	);
};

export default InnovationPage;

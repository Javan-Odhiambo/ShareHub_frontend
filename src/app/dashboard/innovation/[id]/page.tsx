"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Bookmark,
	EllipsisVertical,
	Heart,
	MessageCircle,
	Share2,
	SquarePen,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import {
	useInnovationsFetchOneQuery,
	useInnovationsCommentsCreateMutation,
	useInnovationsCommentsListQuery,
	useInnovationsCommentsDeleteMutation,
	useInnovationsCommentsUpdatePatchMutation,
	useInnovationsCommentsUpdatePutMutation,
	useInnovationsCommentsReadQuery,
} from "@/redux/features/innovations/innovationsApiSlice";
import { get_fallback_name } from "@/lib/utils";
import {
	useBookmarkInnovation,
	useLikeInnovation,
	useUnbookmarkInnovation,
	useUnlikeInnovation,
} from "@/lib/hooks";
import { PaginationDemo } from "@/components/Pagination";

type InnovationDetailPageProps = {
	params: {
		id: string;
	};
};

const CommentSchema = z.object({
	message: z.string().min(2).max(255),
});

type TComment = z.infer<typeof CommentSchema>;

const commentsPerPage = 5;

const InnovationDetailPage = ({ params }: InnovationDetailPageProps) => {
	const { id } = params;
	const handleLike = useLikeInnovation(id);
	const handleUnlike = useUnlikeInnovation(id);
	const handleBookmark = useBookmarkInnovation(id);
	const handleUnbookmark = useUnbookmarkInnovation(id);
	
	const form = useForm<TComment>({
		resolver: zodResolver(CommentSchema),
	});
	
	const [currentPage, setCurrentPage] = useState(1);
	// Fetch innovation data
	const {
		data: innovation,
		isLoading: isGettingInnovation,
		error: errorGettingInnovation,
	} = useInnovationsFetchOneQuery(id);
	const [createComment, { isLoading: isCreatingComment }] =
		useInnovationsCommentsCreateMutation();
	const {
		data: commentData,
		isLoading: isGettingComment,
		error: errorGettingComments,
	} = useInnovationsCommentsListQuery({ id:id , page:currentPage });
	console.log(commentData);
	// extracting comments  from the request
	const {
		results: comments,
		next: nextCommentPage,
		previous: previousCommentPage,
		count: totalComments,
	} = commentData || {};

	// * handling pagination
	const totalPages =
		totalComments && Math.ceil(totalComments / commentsPerPage);
	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (totalPages && currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	//initialize toast
	const { toast } = useToast();
	//Function that handles submision of validated data
	const onSubmit = async (data: TComment) => {
		// useInnovationsCommentsDeleteMutation
		// useInnovationsCommentsUpdatePatchMutation
		// useInnovationsCommentsUpdatePutMutation
		// useInnovationsCommentsReadQuery

		// Submit the data to your API or perform any other action
		createComment({ id, ...data })
			.unwrap()
			.then((response) => {
				// toast created successfully
				toast({
					title: "Comments submitted successfully",
				});
				console.log("Response: ", response);
				form.reset({ message: "" });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return isGettingInnovation || isGettingComment ? (
		<div>Loading...</div>
	) : errorGettingInnovation || errorGettingComments ? (
		<div>Something went wrong</div>
	) : (
		<main>
			<section className="flex flex-col">
				<div className="flex justify-between items-center p-4">
					<h2 className="font-semibold text-3xl">{innovation?.title}</h2>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="hover:bg-accent rounded-full p-1">
								<EllipsisVertical />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuItem>
								<SquarePen className="mr-2 h-4 w-4" />
								<Link href={""}>
									{" "}
									{/*TODO: Add edit page link */}
									<span>Edit</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:bg-destructive active:bg-destructive focus:bg-destructive hover:text-white active:text-white focus:text-white">
								<Trash2 className="mr-2 h-4 w-4" />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<p className="px-4 ">{innovation?.description}</p>
				<div className="flex items-center justify-between mt-5 px-4 ">
					<div className="flex items-center gap-3">
						<Avatar className="h-12 w-12">
							<AvatarImage src={innovation?.author.profile_image} />
							<AvatarFallback className="p-2">
								{get_fallback_name(
									innovation?.author.first_name,
									innovation?.author.last_name
								)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p>{`${innovation?.author.first_name} ${innovation?.author.last_name}`}</p>
							<p className="text-sm">{innovation?.author.email}</p>
						</div>
					</div>

					<div className="flex gap-2 md:gap-4">
						<Link href={innovation?.dashboard_link || ""}>
							<Button className="rounded-full md:px-9"> Visit </Button>
						</Link>
						<Link download href={innovation.dashboard_definition}>
						<Button className="rounded-full" variant={"outline"}>
							Download Datasets
						</Button>
						</Link>

					</div>
				</div>
				<div className="flex p-4 my-2 justify-between bg-accent">
					<div className="flex gap-3">
						<span
							className="flex"
							onClick={innovation?.is_liked ? handleUnlike : handleLike}
						>
							{innovation?.is_liked ? (
								<Heart className="fill-red-500" />
							) : (
								<Heart className="hover:fill-red-500" />
							)}{" "}
							{innovation?.likes_number}
						</span>
						<span className="flex">
							<MessageCircle /> {innovation?.comments_number}{" "}
						</span>
					</div>
					<span
						className="flex"
						onClick={
							innovation?.is_bookmarked ? handleUnbookmark : handleBookmark
						}
					>
						{innovation?.is_bookmarked ? (
							<Bookmark className="fill-green-600" />
						) : (
							<Bookmark />
						)}
					</span>
				</div>
			</section>
			<section>
				{innovation?.banner_image ? (
					<Image
						alt="Innovation Image"
						width={500}
						height={600}
						src={innovation?.banner_image}
					/>
				) : (
					<></>
				)}
			</section>
			{/* Comments container */}
			<section className="p-7 space-y-4">
				{comments?.map((comment, index) => (
					<div className="border p-3 rounded-lg shadow-md" key={index}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Avatar className="h-12 w-12">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback className="p-2">CN</AvatarFallback>
								</Avatar>
								<div>
									<p>
										{comment.author.first_name} {comment.author.last_name}
									</p>
									<p className="text-sm">{comment.author.email}</p>
								</div>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="hover:bg-accent rounded-full p-1">
										<EllipsisVertical />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuItem>
										<SquarePen className="mr-2 h-4 w-4" />
										<Link href={""}>
											{" "}
											{/*TODO: Add edit page link */}
											<span>Edit</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className="hover:bg-destructive active:bg-destructive focus:bg-destructive hover:text-white active:text-white focus:text-white">
										<Trash2 className="mr-2 h-4 w-4" />
										<span>Delete</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<Separator className="my-3" />
						<p>{comment.text}</p>
					</div>
				))}
				<PaginationDemo
					currentPage={currentPage}
					totalPages={totalPages ?? 0}
					onPrevious={handlePrevious}
					onNext={handleNext}
				/>
			</section>

			<section className="px-6 pb-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Comment</FormLabel>
									<FormControl>
										<Textarea placeholder="Type comment here..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="rounded-full"
							type="submit"
							size={"lg"}
							disabled={isCreatingComment}
						>
							Submit
						</Button>
					</form>
				</Form>
			</section>
		</main>
	);
};

export default InnovationDetailPage;

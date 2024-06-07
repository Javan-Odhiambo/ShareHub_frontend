import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CustomAvatar from "@/components/ui/custom-avatar";

type CommentsContainerProps = {
	innovationID: string;
};

const CommentsContainer = ({ innovationID }: CommentsContainerProps) => {
	const fetchComments = async ({ pageParam }: { pageParam: number }) => {
		const response = await fetch(
			`http://localhost:8000/api/innovations/${innovationID}/comments/?page=${pageParam}`
		);
		if (!response.ok) {
			throw new Error("Problem fetching comments");
		}
		return response.json();
	};

	const {
		data: commentData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isGettingComments,
		error: errorGettingComments,
	} = useInfiniteQuery({
		queryKey: ["comments", innovationID],
		queryFn: ({ pageParam = 1 }) => fetchComments({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.next) {
				return allPages.length + 1;
			}
		},
	});

	const { ref, inView } = useInView();

	React.useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	return isGettingComments ? (
		<div>Loading...</div>
	) : errorGettingComments ? (
		<div>Something went wrong</div>
	) : (
		<section className="p-7 space-y-4" ref={ref}>
			{commentData?.pages.flatMap((page) =>
				page.results.map((comment: any, index: number) => {
					if (page.results.length === index + 1) {
						return (
							<div
								className="border p-3 rounded-lg shadow-md"
								key={index}
								ref={ref}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<CustomAvatar
											image_url={comment.author.profile_picture}
											first_name={comment.author.first_name}
											last_name={comment.author.last_name}
										></CustomAvatar>
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
						);
					} else {
						return (
							<div className="border p-3 rounded-lg shadow-md" key={index}>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<CustomAvatar
											image_url={comment.author.profile_picture}
											first_name={comment.author.first_name}
											last_name={comment.author.last_name}
										></CustomAvatar>
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
						);
					}
				})
			)}
		</section>
	);
};

export default CommentsContainer;

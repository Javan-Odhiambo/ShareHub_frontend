"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import {
	Bookmark,
	EllipsisVertical,
	Heart,
	MessageCircle,
	Share2,
	SquarePen,
	Trash2,
	Copy,
} from "lucide-react";
import { useBookmarkInnovation, useLikeInnovation, useUnbookmarkInnovation, useUnlikeInnovation } from "@/lib/hooks";
import { toast } from "./use-toast";
import {
	useInnovationsDeleteMutation,
	useInnovationsLikesCreateMutation,
	useInnovationsBookmarksCreateMutation,
	useInnovationsUnbookmarkMutation,
	useInnovationsUnlikeMutation,
} from "@/redux/features/innovations/innovationsApiSlice";
import { extractIdFromUrl } from "@/utils/ExtractIdFromUrl";
import { useRouter } from "next/navigation";

// * interface for project card props
interface CardProps {
	innovation_url: string;
	author_avator_image_url?: string;
	author_first_name?: string;
	author_last_name?: string;
	project_title: string;
	project_description: string;
	dashboard_banner_image_url: string;
	likes_count:number;
	comments_count:number;
	is_liked:boolean;
	is_bookmarked:boolean;
}

const ProjectCard = ({
	innovation_url,
	author_avator_image_url,
	author_first_name,
	author_last_name,
	project_title,
	project_description,
	dashboard_banner_image_url,
	likes_count,
	comments_count,
	is_liked = false,
	is_bookmarked = false,
}: CardProps) => {
	const innovationId = extractIdFromUrl(innovation_url) as string;


	const handleLike = useLikeInnovation(innovationId);
	const handleUnlike = useUnlikeInnovation(innovationId);
	const handleBookmark = useBookmarkInnovation(innovationId);
	const handleUnbookmark = useUnbookmarkInnovation(innovationId);

	const [showShareDialog, setShowShareDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleShareClick = () => {
		setShowShareDialog(true);
	};

	const handleCloseShareDialog = () => {
		setShowShareDialog(false);
	};

	const handleDeleteClick = () => {
		setShowDeleteDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setShowDeleteDialog(false);
	};

	//initializing the delete mutation
	const [deleteInnovation, { isLoading }] = useInnovationsDeleteMutation();


	const handleConfirmDelete = () => {
		// Perform delete operation here
		console.log("Project deleted");
		handleCloseDeleteDialog();
		console.log(innovationId);
		deleteInnovation({ id: innovationId })
			.unwrap()
			.then(() => {
				toast({
					title: "Project Deleted successfully",
					variant: "destructive",
				});
			})
			.catch((error) => {
				toast({
					title: "Something went wrong",
					description: "There was a problem with your deletion request",
				});
				console.log(error);
			});
	};

	const router = useRouter();
	const handleEditClick = () => {
		const innovationId = extractIdFromUrl(innovation_url);
		return router.push(`/dashboard/new/${innovationId}`);
	};


	return (
		<Card className="max-w-[500px]">
			<div className="p-0 mx-6 flex justify-between items-center">
				<div className="flex items-center gap-2 mt-2">
					<Avatar>
						<AvatarImage src={author_avator_image_url} alt="@shadcn" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<Link href="/dashboard">
						{author_first_name} {author_last_name}
					</Link>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="hover:bg-accent rounded-full p-1">
							<EllipsisVertical />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuSeparator />

						<DropdownMenuItem onSelect={handleShareClick}>
							<>
								<Share2 className="mr-2 h-4 w-4" />
								<span>Share</span>
							</>
						</DropdownMenuItem>

						<DropdownMenuItem onSelect={handleEditClick}>
							<SquarePen className="mr-2 h-4 w-4" />
							<Link
								href={{
									pathname: "/dashboard/new",
									query: {
										id: innovationId,
									},
								}}
							>
								{" "}
								{/*TODO: Add edit page link */}
								{/* <span>Edit</span> */}
								Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="hover:bg-destructive active:bg-destructive focus:bg-destructive hover:text-white active:text-white focus:text-white"
							onSelect={handleDeleteClick}
						>
							<Trash2 className="mr-2 h-4 w-4" />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{showShareDialog && (
					<Dialog open={showShareDialog} onOpenChange={handleCloseShareDialog}>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Share link</DialogTitle>
								<DialogDescription>
									Anyone who has this link will be able to view this.
								</DialogDescription>
							</DialogHeader>
							<div className="flex items-center space-x-2">
								<div className="grid flex-1 gap-2">
									<Label htmlFor="link" className="sr-only">
										Link
									</Label>
									<Input
										id="link"
										defaultValue="https://ui.shadcn.com/docs/installation"
										readOnly
									/>
								</div>
								<Button type="submit" size="sm" className="px-3">
									<span className="sr-only">Copy</span>
									<Copy className="h-4 w-4" />
								</Button>
							</div>
							<DialogFooter className="sm:justify-start">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Close
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}

				{showDeleteDialog && (
					<AlertDialog
						open={showDeleteDialog}
						onOpenChange={handleCloseDeleteDialog}
					>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your innovation and remove your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel onClick={handleCloseDeleteDialog}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction onClick={handleConfirmDelete}>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
			<CardContent className="pb-0">
				<div className="flex  flex-col justify-between gap-5">
					<div className="flex-1">
						<Image
							loader={() => dashboard_banner_image_url}
							src="/Image Icon.png"
							width={450}
							height={150}
							alt="Dashboard image"
							objectFit="contain"
							className=""
						/>
					</div>
					<div className="flex flex-col gap-3 flex-1">
						<h2 className="text-xl font-semibold">{project_title}</h2>
						<CardDescription className="max-w-[400px]">
							{project_description}
						</CardDescription>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-5 pb-3">
				<div className="flex flex-1 justify-between">
					<div className="flex gap-4">
						<span
							className="flex"
							onClick={is_liked ? handleUnlike : handleLike}
							>
							{is_liked ? (
								<Heart className="fill-red-500" />
							) : (
								<Heart className="hover:fill-red-500" />
							)}{" "}
							{likes_count}
						</span>
						<span className="flex">
							<MessageCircle /> {comments_count}{" "}
						</span>
					</div>
					<span
						className="flex"
						onClick={is_bookmarked ? handleUnbookmark : handleBookmark}
					>
						{is_bookmarked ? (
							<Bookmark className="fill-green-600" />
						) : (
							<Bookmark />
						)}
					</span>
				</div>
				<Link href={`/dashboard/innovation/${innovationId}`} className="flex-1">
					<Button className="w-full rounded-full">View Project</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default ProjectCard;

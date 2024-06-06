import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useInnovationsCommentsListQuery } from '@/redux/features/innovations/innovationsApiSlice'
import {
    EllipsisVertical,
    Trash2,
} from "lucide-react";
import { PaginationDemo } from "@/components/Pagination";
import { Separator } from "@/components/ui/separator";
import CustomAvatar from '@/components/ui/custom-avatar';


type CommentsContainerProps = {
    innovationID: string
}
const CommentsContainer = ({ innovationID}: CommentsContainerProps) => {
    const commentsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    

    const {
        data: commentData,
        isLoading: isGettingComments,
        error: errorGettingComments,
    } = useInnovationsCommentsListQuery({ id: innovationID, page: currentPage });
    console.log(commentData);

    // extracting comments  from the request
    const {
        results: comments,
        next: nextCommentPage,
        previous: previousCommentPage,
        count: totalComments,
    } = commentData || {};

    const totalPages =
    totalComments && Math.ceil(totalComments / commentsPerPage);
    
    // * handling pagination
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
    return isGettingComments ? (
            <div>Loading...</div>
          ) : errorGettingComments ? (
            <div>Something went wrong</div>
          ) : (
    
        <section className="p-7 space-y-4">
            {comments?.map((comment, index) => (
                <div className="border p-3 rounded-lg shadow-md" key={index}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <CustomAvatar image_url={comment.author.profile_picture} first_name={comment.author.first_name} last_name={comment.author.last_name}></CustomAvatar>
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
                                {/* <DropdownMenuItem>
                                    <SquarePen className="mr-2 h-4 w-4" />
                                    // TODO: Comment Editing
                                    <Link href={""}>
                                        <span>Edit</span>
                                    </Link>
                                </DropdownMenuItem> */}
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
    )
}


export default CommentsContainer

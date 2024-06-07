"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Bookmark,
  EllipsisVertical,
  Heart,
  MessageCircle,
  SquarePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  useInnovationsFetchOneQuery,
} from "@/redux/features/innovations/innovationsApiSlice";
import {
  useBookmarkInnovation,
  useLikeInnovation,
  useUnbookmarkInnovation,
  useUnlikeInnovation,
} from "@/lib/hooks"; 
import CommentsContainer from "@/components/commentsContainer";
import CommentsForm from "@/components/commentsForm";
import CustomAvatar from "@/components/ui/custom-avatar";
import SupersetEmbed from "@/components/supersetEmbed";


type InnovationDetailPageProps = {
  params: {
    id: string;
  };
};

const InnovationDetailPage = ({ params }: InnovationDetailPageProps) => {
  const { id } = params;
  const handleLike = useLikeInnovation(id);
  const handleUnlike = useUnlikeInnovation(id);
  const handleBookmark = useBookmarkInnovation(id);
  const handleUnbookmark = useUnbookmarkInnovation(id);



  // Fetch innovation data
  const {
    data: innovation,
    isLoading: isGettingInnovation,
    error: errorGettingInnovation,
  } = useInnovationsFetchOneQuery(id);



  return isGettingInnovation ? (
    <div>Loading...</div>
  ) : errorGettingInnovation ? (
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
                {/* TODO: URL generator */}
                <Link href={`/dashboard/innovation/edit/${id}`}>
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

          <CustomAvatar image_url={innovation?.author.profile_picture} first_name={innovation?.author.first_name} last_name={innovation?.author.last_name}></CustomAvatar>
            <div>
              <p>{`${innovation?.author.first_name} ${innovation?.author.last_name}`}</p>
              <p className="text-sm">{innovation?.author.email}</p>
            </div>
          </div>

          <div className="flex gap-2 md:gap-4">
            {innovation?.dashboard_link && (
              <Link href={innovation?.dashboard_link || ""}>
                <Button className="rounded-full md:px-9"> Visit </Button>
              </Link>
            )}
            {innovation?.dashboard_definitions && (
              <Link download href={innovation.dashboard_definitions}>
                <Button className="rounded-full" variant={"outline"}>
                  Download Datasets
                </Button>
              </Link>
            )}
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
        {/* Superset Dashboard display */}
        <SupersetEmbed embed_id={innovation?.embed_id} />

      </section>
      {/* Comments Form */}
      <CommentsForm id={id} />

      {/* Comments container */}
      <CommentsContainer innovationID={id} />

    </main>
  );
};

export default InnovationDetailPage;

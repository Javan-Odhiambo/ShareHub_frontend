"use client";
import React, { useEffect, useState } from "react";
import { useInnovationsFetchManyQuery } from "@/redux/features/innovations/innovationsApiSlice";
import ProjectCard from "@/components/ui/projectcard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { LoaderCircleIcon } from "lucide-react";
// * items per page in a response to calculate the total number of paginations needed at the bottom
const ITEMS_PER_PAGE = 5; // Update this to match the number of items per page in your API

const Home = () => {
	const [hasSearchResults, setHasSearchResults] = useState(false);

	const { ref, inView } = useInView();

	// * fetching all innovations
	async function fetchInnovations({ pageParam }: { pageParam: number }) {
		const res = await fetch(
			`http://localhost:8000/api/innovations/?page=${pageParam}`
		);
		return res.json();
	}

	const {
		data: innovationDataFetch,
		status: innovationStatus,
		error: innovationError,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ["innovations"],
		queryFn: fetchInnovations,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.next) {
				return allPages.length + 1;
			}
		},
	});

	const content = innovationDataFetch?.pages?.flatMap((page: any) => {
		return page.results.map((innovation: any, index: number) => {
			if (page.results.length == index + 1) {
				return (
					<ProjectCard
						key={innovation.url}
						innovation_url={innovation.url}
						author_avator_image_url={innovation.author.profile_picture}
						author_first_name={innovation.author.first_name}
						author_last_name={innovation.author.last_name}
						project_title={innovation.title}
						project_description={innovation.description}
						dashboard_image_url={innovation.dashboard_image}
						likes_count={innovation.likes_number}
						comments_count={innovation.comments_number}
						is_liked={innovation.is_liked}
						is_bookmarked={innovation.is_bookmarked}
						innerRef={ref}
					/>
				);
			} else {
				return (
					<ProjectCard
						key={innovation.url}
						innovation_url={innovation.url}
						author_avator_image_url={innovation.author.profile_picture}
						author_first_name={innovation.author.first_name}
						author_last_name={innovation.author.last_name}
						project_title={innovation.title}
						project_description={innovation.description}
						dashboard_image_url={innovation.dashboard_image}
						likes_count={innovation.likes_number}
						comments_count={innovation.comments_number}
						is_liked={innovation.is_liked}
						is_bookmarked={innovation.is_bookmarked}
					/>
				);
			}
		});
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (innovationStatus === "pending") {
		return <p>Loading...</p>;
	}
	if (innovationStatus === "error") {
		return <p>Error: {innovationError?.message}</p>;
	}
	if (!hasSearchResults) {
		return (
			<>
				<section className="flex flex-wrap mx-auto gap-4 p-4">
					{content}
				</section>
				{isFetchingNextPage && (
					<LoaderCircleIcon size={28} className="animate-spin ml-10" />
				)}
			</>
		);
	}
};

export default Home;

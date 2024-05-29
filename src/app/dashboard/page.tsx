"use client";
import React, { useState, useEffect } from "react";
import { useInnovationsFetchManyQuery } from "@/redux/features/innovations/innovationsApiSlice";
import ProjectCard from "@/components/ui/projectcard";
import { useToast } from "@/components/ui/use-toast";
import { PaginationDemo } from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";

// * items per page in a response to calculate the total number of paginations needed at the bottom
const ITEMS_PER_PAGE = 5; // Update this to match the number of items per page in your API

const Home = () => {
	const { toast } = useToast();
	const [currentPage, setCurrentPage] = useState(1);
	const [isClient, setIsClient] = useState(false);

	// * fetching all innovations
	const {
		data: innovationsList,
		isLoading,
		error,
	} = useInnovationsFetchManyQuery(currentPage);
	
	// * pagination functions
	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// * to remove shadcn pagination component error
	useEffect(() => {
		setIsClient(true);
	}, []);


	const totalPages = Math.ceil(innovationsList?.count / ITEMS_PER_PAGE);

	if (error) {
		toast({
			title: "Refresh the page",
			description: "Something went wrong when fetching innovation list",
		});
		return;
	} else {
		return isClient ? (
			<div className="w-full">
				{/* <h1>Home Page</h1> */}
				<SearchComponent className="mt-4 self-center content-center ml-4"/>
				{isLoading ? (
					<p>Loading..</p>
				) : (
					<section className="flex flex-wrap mx-auto gap-4 p-4">
						{innovationsList?.results.map((innovation: any) => {
							return (
								<ProjectCard
									key={innovation.url}
									innovation_url={innovation.url}
									author_avator_image_url={innovation.author.profile_picture}
									author_first_name={innovation.author.first_name}
									author_last_name={innovation.author.last_name}
									project_title={innovation.title}
									project_description={innovation.description}
									dashboard_banner_image_url={innovation.banner_image}
									likes_count={innovation.likes_number}
									comments_count={innovation.comments_number}
									is_liked={innovation.is_liked}
									is_bookmarked={innovation.is_bookmarked}
								/>
							);
						})}
					</section>
				)}
				<PaginationDemo
					currentPage={currentPage}
					totalPages={totalPages}
					onPrevious={handlePrevious}
					onNext={handleNext}
				/>
			</div>
		) : (
			<>Loading</>
		);
	}
};

export default Home;

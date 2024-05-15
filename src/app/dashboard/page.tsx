"use client";
import React from "react";
import { useInnovationsFetchManyQuery } from "@/redux/features/innovations/innovationsApiSlice";
import ProjectCard from "@/components/ui/projectcard";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
	// * initialize toast
	const { toast } = useToast();
	// *getting many innovations , pass null when there are no query parameters
	const {
		data: innovationsList,
		isLoading,
		error,
	} = useInnovationsFetchManyQuery(null);

	if (error) {
		toast({
			title: "Refresh the page",
			description: "Something went wrong when fetching innovation list",
		});
		return;
	} else {
		console.log(innovationsList);
		// todo implement shadcn ui skeleton while loading
		return (
			<div className="w-full">
				<h1>Home Page</h1>
				{isLoading ? (
					<p>Loading..</p>
				) : (
					<section className="flex flex-wrap mx-auto gap-4 p-4">
						{innovationsList.results.map((innovation: any) => {
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
			</div>
		);
	}
};

export default Home;

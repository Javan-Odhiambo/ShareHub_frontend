"use client";
import React from "react";
import {
	useInnovationsFetchManyQuery,
	useInnovationsFetchOneQuery,
} from "@/redux/features/innovations/innovationsApiSlice";
import ProjectCard from "@/components/ui/projectcard";

const Home = () => {
	// *getting many innovations , pass null when there are no query parameters
	// const { data , isLoading , error } = useInnovationsFetchManyQuery(null);

	const id = 2
	const { data,isLoading, error } = useInnovationsFetchOneQuery(id)
	if (error) {
		console.log(error);
	} else {
		console.log(data);
	}

	// todo implement shadcn ui skeleton while loading
	return (
		<div>
			<h1>Home Page</h1>
			{isLoading && <p>Loading..</p>}
		</div>
	);
};

export default Home;

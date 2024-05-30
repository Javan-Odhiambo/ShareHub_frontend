"use client";
import { ReactEventHandler, useState } from "react";
import {
	useSearchInnovationsQuery,
	useSearchProfilesQuery,
} from "@/redux/features/search/searchApiSlice";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TInnovation, TProfile } from "@/lib/types";
import { Button } from "./ui/button";
import ProjectCard from "@/components/ui/projectcard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function SearchComponent({ className }: { className?: string }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchClicked, setSearchClicked] = useState(false);

	const { data: innovationsResults, isLoading: isLoadingInnovations } =
		useSearchInnovationsQuery(searchTerm, { skip: !searchClicked });
	// const { data: profilesResults, isLoading: isLoadingProfiles } =
	// 	useSearchProfilesQuery(searchTerm, { skip: !searchClicked });

	const handleSearchChange: ReactEventHandler<HTMLInputElement> = (event) => {
		setSearchTerm((event.target as HTMLInputElement).value);
	};

	const handleSearchClick = () => {
		setSearchClicked(true);
	};
	// console.log(innovationsResults)
	if (isLoadingInnovations) {
		return <p>Loading...</p>;
	}
	console.log(innovationsResults);
	// console.log(profilesResults);
	return (
		<div className={`${className}`}>
			<form>
				<div className="relative flex">
					{/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
					<Input
						type="search"
						placeholder="Type here to find ..."
						className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<Button
						variant={"outline"}
						onClick={handleSearchClick}
						className="flex justify-center items-center"
					>
						<Search className="h-5 w-5 text-muted-foreground" />
					</Button>
				</div>
			</form>
			{/* <h1>Search Results</h1>
			<h2>Innovations</h2> */}
			<div className="flex gap-2 flex-col max-w-full flex-wrap">
				<p>Innovation search results</p>
				{innovationsResults?.innovations.map((innovation: TInnovation) => (
					<section className="flex flex-wrap mx-auto gap-4 p-4">
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
					</section>
				))}
			</div>
			{/* <h2>Profiles</h2> */}
			{/* <div className="">
				<p>Profile Search results</p>
				{profilesResults?.profiles.map((profile: TProfile) => (
					<section
						className="flex flex-col sm:flex-row space-x-9 pb-7 mx-4 max-w-fit border border-solid"
						key={profile.id}
					>
						<div>
							<Avatar className="h-30 w-30 sm:h-36 sm:w-36 md:h-52 md:w-52 max-h-[200px] max-w-[200px] mx-auto ">
								<AvatarImage
									src={profile?.profile_picture || "/profile-svgrepo-com.svg"}
								/>
							</Avatar>
						</div>
						<div className="max-w-xl">
							<h2 className="font-semibold text-xl">
								{profile?.first_name} {profile?.last_name}
							</h2>
							<p>{profile?.phone_number}</p>
							<p>{profile?.email}</p>

							<p className="mt-4">{profile?.bio}</p>
						</div>
					</section>
				))}
			</div> */}
		</div>
	);
}

export default SearchComponent;

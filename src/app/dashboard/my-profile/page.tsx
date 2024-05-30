"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
	useProfilesMeQuery,
	useProfilesMeInnovationsQuery,
} from "@/redux/features/profile/profileApiSlice";
import ProjectCard from "@/components/ui/projectcard";

const MyProfilePage = () => {
	const {
		data: myProfileData,
		isLoading: myProfileIsLoading,
		error,
	} = useProfilesMeQuery(null);

	const {
		data: myInnovationsData,
		isLoading: myInnovationsIsLoading,
		error: innovationsError,
	} = useProfilesMeInnovationsQuery(null);

	console.log(myInnovationsData);
	return (
		<main className="pt-6">
			{myProfileIsLoading ? (
				<p>Loading ...</p>
			) : (
				<section className="flex flex-col sm:flex-row space-x-9 pb-7 mx-4">
					<div>
						<Avatar className="h-30 w-30 sm:h-36 sm:w-36 md:h-52 md:w-52 max-h-[200px] max-w-[200px] mx-auto ">
							<AvatarImage
								src={
									myProfileData?.profile_picture || "/profile-svgrepo-com.svg"
								}
							/>
						</Avatar>
						<Link
							href="/dashboard/my-profile/edit/"
							className="underline text-stone-900"
						>
							Edit Profile{" "}
						</Link>
					</div>
					<div className="max-w-xl">
						<h2 className="font-semibold text-xl">
							{myProfileData?.first_name} {myProfileData?.last_name}
						</h2>
						<p>{myProfileData?.phone_number}</p>
						<p>{myProfileData?.email}</p>

						<p className="mt-4">{myProfileData?.bio}</p>
					</div>
				</section>
			)}
			<Separator className="" />

			<section className="flex flex-wrap mx-auto gap-4 p-4">
				{myInnovationsIsLoading ? (
					<h3 className="text-muted">Getting your innovations </h3>
				) : (
					myInnovationsData?.results.map((innovation: any) => {
						// const { innovation, user } = item;
						return (
							<ProjectCard
								key={innovation.url}
								innovation_url={innovation.url}
								// author_avator_image_url={
								// 	user.profile_picture || "/profile-svgrepo-com.svg"
								// }
								// author_first_name={user.first_name}
								// author_last_name={user.last_name}
								project_title={innovation.title}
								project_description={innovation.description}
								dashboard_image_url={innovation.dashboard_image}
								likes_count={innovation.likes_number}
								comments_count={innovation.comments_number}
								is_liked={innovation.is_liked}
								is_bookmarked={innovation.is_bookmarked}
							/>
						);
					})
				)}
			</section>
		</main>
	);
};

export default MyProfilePage;

"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useProfilesMeQuery } from "@/redux/features/profile/profileApiSlice";

const MyProfilePage = () => {
	const {
		data: myProfileData,
		isLoading: myProfileIsLoading,
		error,
	} = useProfilesMeQuery(null);
	// console.log(myProfileData)
	return (
		<main className="pt-6">
			{myProfileIsLoading ? (
				<p>Loading ...</p>
			) : (
				<section className="flex flex-col sm:flex-row space-x-9 pb-7 mx-4">
					<div>
						<Avatar className="h-30 w-30 sm:h-36 sm:w-36 md:h-52 md:w-52 max-h-[200px] max-w-[200px] mx-auto ">
							<AvatarImage src={myProfileData.profile_picture} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
                    <Link href="/dashboard/my-profile/edit/" className="underline text-stone-900">Edit Profile </Link>
					</div>
					<div className="max-w-xl">
						<h2 className="font-semibold text-xl">
							{myProfileData.first_name} {myProfileData.last_name}
						</h2>
						<p>{myProfileData.phone_number}</p>
						<p>{myProfileData.email}</p>

						<p className="mt-4">{myProfileData.bio}</p>
					</div>
				</section>
			)}
			<Separator className="" />

			<section></section>
		</main>
	);
};

export default MyProfilePage;

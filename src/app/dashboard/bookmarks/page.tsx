"use client"
import React from 'react'
import { useInnovationsBookmarksListQuery } from '@/redux/features/innovations/innovationsApiSlice';
import ProjectCard from '@/components/ui/projectcard';
const BookmarkPage = () => {
	const { data: bookmarksList, isLoading: bookmarkIsLoading } =
		useInnovationsBookmarksListQuery(null);
	console.log(bookmarksList);
  return (
		<main>
			<section className="flex flex-wrap mx-auto gap-4 p-4">
				{bookmarkIsLoading ? (
					<h3 className="text-muted">Getting your bookmarks </h3>
				) : (
					bookmarksList?.results.map((item: any) => {
						const { innovation, user } = item;
						return (
							<ProjectCard
								key={innovation.url}
								innovation_url={innovation.url}
								author_avator_image_url={
									user.profile_picture || "/profile-svgrepo-com.svg"
								}
								author_first_name={user.first_name}
								author_last_name={user.last_name}
								project_title={innovation.title}
								project_description={innovation.description}
								dashboard_banner_image_url={innovation.banner_image}
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
}

export default BookmarkPage

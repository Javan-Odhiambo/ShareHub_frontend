"use client"
import { useInnovationsDraftsListQuery } from '@/redux/features/innovations/innovationsApiSlice';
import ProjectCard from '@/components/ui/projectcard';
import React, { useState, useEffect } from "react";
import { PaginationDemo } from '@/components/Pagination';

const ITEMS_PER_PAGE = 5; // Update this to match the number of items per page in your API

const DraftsPage = () => {
    const { data: draftsList, isLoading: draftsIsLoading } =
        useInnovationsDraftsListQuery(null);
    console.log(draftsList)
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false);
    const [hasSearchResults, setHasSearchResults] = useState(false);

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
    const totalPages = Math.ceil(draftsList?.count / ITEMS_PER_PAGE);

    // author
    // :
    // { id: 2, email: 'javan@mail.com', first_name: '', last_name: '', username: '', … }
    // comments_number
    // :
    // 0
    // created_at
    // :
    // "2024-05-31T08:21:49.783012Z"
    // dashboard_definitions
    // :
    // "http://localhost:8000/media/dashboard_definitions/Useful_links.png"
    // dashboard_id
    // :
    // "undefined"
    // dashboard_image
    // :
    // "http://localhost:8000/media/dashboards/IEEE_voles.png"
    // dashboard_link
    // :
    // "https://blog.logrocket.com/react-hook-form-complete-guide/"
    // dashboard_type
    // :
    // "M"
    // description
    // :
    // "Helloddfdfadf"
    // is_bookmarked
    // :
    // false
    // is_liked
    // :
    // false
    // likes_number
    // :
    // 0
    // status
    // :
    // "D"
    // title
    // :
    // "Another test"
    // updated_at
    // :
    // "2024-05-31T08:21:49.783063Z"
    // url
    // :
    // "http://localhost:8000/api/innovations/2/"

    return (
        <main>
            <section className="flex flex-wrap mx-auto gap-4 p-4">
                {draftsIsLoading ? (
                    <h3 className="text-muted">Getting your drafts </h3>
                ) : (
                    draftsList ? (
                        draftsList.results.map((innovation: any) => {
                            return (
                                <ProjectCard
                                    key={innovation.url}
                                    innovation_url={innovation.url}
                                    author_avator_image_url={
                                        innovation.author.profile_picture || "/profile-svgrepo-com.svg"
                                    }
                                    author_first_name={innovation.author.first_name}
                                    author_last_name={innovation.author.last_name}
                                    project_title={innovation.title}
                                    project_description={innovation.description}
                                    dashboard_banner_image_url={innovation.banner_image}
                                    likes_count={innovation.likes_number}
                                    comments_count={innovation.comments_number}
                                    is_liked={innovation.is_liked}
                                    is_bookmarked={innovation.is_bookmarked}
                                    status={innovation.status}
                                />
                            );
                        })
                    ) : (
                        <h1>No drafts found</h1>
                    )
                )}
            </section>
            {/* <PaginationDemo
							currentPage={currentPage}
							totalPages={totalPages}
							onPrevious={handlePrevious}
							onNext={handleNext}
						/> */}
        </main>
    );
}

export default DraftsPage

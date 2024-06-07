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
                                    author_email={innovation.author.email}
                                    project_title={innovation.title}
                                    project_description={innovation.description}
                                    dashboard_image_url={innovation.dashboard_image}
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

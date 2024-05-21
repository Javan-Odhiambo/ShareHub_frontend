import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationDemoProps {
	currentPage: number;
	totalPages: number;
	onPrevious: () => void;
	onNext: () => void;
}

export const PaginationDemo: React.FC<PaginationDemoProps> = ({
	currentPage,
	totalPages,
	onPrevious,
	onNext,
}) => {
	// Generate an array of page numbers
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	const onPageChange = (page: number) => {
		if (page < currentPage) {
			onPrevious();
		} else if (page > currentPage) {
			onNext();
		}
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" onClick={onPrevious} />
				</PaginationItem>
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href="#"
							onClick={() => onPageChange(page)}
							isActive={page === currentPage}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				{currentPage < totalPages && <PaginationEllipsis />}
				<PaginationItem>
					<PaginationNext href="#" onClick={onNext} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

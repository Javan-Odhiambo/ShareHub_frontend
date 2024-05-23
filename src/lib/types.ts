// Definition of the types used in the application
interface TInnovation {
    url: string;
    author: {
        id: string;
        email: string;
        profile_image: string;
        username: string;
        first_name: string;
        last_name: string;
    }
    title: string;
    description: string;
    dashboard_link: string;
    dashboard_image: string;
    banner_image: string;
    comments_number: number;
    likes_number: number;
    created_at: string;
    updated_at: string;
    is_liked: boolean;
    is_bookmarked: boolean;
    status: string;
    category: string;
}

type TAuthor = {
	id: number;
	email: string;
	profile_picture: string;
	username: string;
	first_name: string;
	last_name: string;
};

type TComment = {
	author: TAuthor;
	created_at: string;
	innovation: number;
	text: string;
	updated_at: string;
};

type CommentResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: TComment[];
};

type TProfile = {
	url: string;
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	created_at: string;
	updated_at: string;
	bio: string;
	profile_picture: string;
	linked_in_url: string | null;
	x_in_url: string | null;
	superset_url: string | null;
};

export type { TInnovation, TComment, CommentResponse, TProfile };
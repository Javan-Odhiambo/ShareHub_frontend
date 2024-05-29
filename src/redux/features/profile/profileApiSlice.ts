import { baseApi } from "../baseApi";

const profileApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		// * list all user profiles
		profilesListAll: builder.query({
			query: () => ({
				url: "/profiles/",
				method: "GET",
			}),
		}),

		// * update user profile 
		profilesUpdate: builder.mutation({
			query: ({
				profile_id,
				profile_picture,
				first_name,
				last_name,
				email,
				phone_number,
				bio,
				linked_in_url,
				x_in_url,
				superset_url,
			}) => {
				const formData = new FormData();
				formData.append("first_name", first_name);
				formData.append("last_name", last_name);
				formData.append("email", email);
				formData.append("phone_number", phone_number);
				formData.append("bio", bio);
				formData.append("linked_in_url", linked_in_url);
				formData.append("x_in_url", x_in_url);
				formData.append("superset_url", superset_url);
				if (profile_picture instanceof FileList) {
					formData.append("profile_picture", profile_picture[0]);
				} 
				else if (profile_picture instanceof File) {
					formData.append("profile_picture", profile_picture)
				}
				return {
					url: `/profiles/${profile_id}/`,
					method: "PATCH",
					body: formData,
				};
			},
			invalidatesTags:['PROFILE']
		}),

		// * get logged in user profie
		profilesMe: builder.query({
			query: () => ({
				url: "/profiles/me/",
				method: "GET",
			}),
			providesTags:['PROFILE']
		}),

		// * get specific user profile
		profilesListOne: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/`,
				method: "GET",
			}),
		}),

		// * delete user profile
		profilesDelete: builder.mutation({
			query: ({ id }) => ({
				url: `/profiles/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags:['PROFILE']
		}),

		// * get profile bookmarks list
		profilesBookmarksList: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/bookmarks/`,
				method: "GET",
			}),
			providesTags:['BOOKMARK']
		}),

		// * get profile innovatios list
		profilesInnovationsList: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/innovations/`,
				method: "GET",
			}),
			providesTags:['INNOVATIONS']
		}),

		// * get profile likes list
		profilesLikesList: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/likes/`,
				method: "GET",
			}),
		}),

		//* get innovations by the logged in user
		profilesMeInnovations: builder.query({
			query: () => ({
				url: "/profiles/me/innovations/",
				method: "GET",
			}),
			providesTags:['INNOVATIONS']
		}),
	}),
});

export const {
	useProfilesListAllQuery,
	useProfilesMeQuery,
	useProfilesListOneQuery,
	useProfilesUpdateMutation,
	useProfilesDeleteMutation,
	useProfilesBookmarksListQuery,
	useProfilesInnovationsListQuery,
	useProfilesLikesListQuery,
	useProfilesMeInnovationsQuery,
} = profileApiSlice;

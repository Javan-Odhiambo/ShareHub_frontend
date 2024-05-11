import { baseApi } from "../baseApi";

const profileApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// * list all user profiles
		profilesListAll: builder.query({
			query: () => ({
				url: "/profiles/",
				method: "GET",
			}),
		}),

		// * create profile
		// todo:add required body details
		profilesCreate: builder.mutation({
			query: () => ({
				url: "/profiles/",
				method: "POST",
				// body: {}
			}),
		}),

		// * get logged in user profie
		profilesMe: builder.query({
			query: () => ({
				url: "/profiles/me/",
				method: "GET",
			}),
		}),

		// * get specific user profile
		profilesListOne: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/`,
				method: "GET",
			}),
		}),

		// * update user profile (patch method)
		profilesUpdatePatch: builder.mutation({
			query: ({ id }) => ({
				url: `/profiles/${id}/`,
				method: "PATCH",
				// body:{}
			}),
		}),

		// * update user profile (put method)
		profilesUpdatePut: builder.mutation({
			query: ({ id }) => ({
				url: `/profiles/${id}/`,
				method: "PUT",
				// body:{}
			}),
		}),

		// * delete user profile
		profilesDelete: builder.mutation({
			query: ({ id }) => ({
				url: `/profiles/${id}/`,
				method: "DELETE",
			}),
		}),

		// * get profile bookmarks list
		profilesBookmarksList: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/bookmarks/`,
				method: "GET",
			}),
		}),

		// * get profile innovatios list
		profilesInnovationsList: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/innovations/`,
				method: "GET",
			}),
		}),

		// * get profile likes list
		profilesLikesList: builder.query({
			query: ({ id }) => ({
				url: `/profiles/${id}/likes/`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useProfilesListAllQuery,
	useProfilesCreateMutation,
	useProfilesMeQuery,
	useProfilesListOneQuery,
	useProfilesUpdatePatchMutation,
	useProfilesUpdatePutMutation,
	useProfilesDeleteMutation,
	useProfilesBookmarksListQuery,
	useProfilesInnovationsListQuery,
	useProfilesLikesListQuery,
} = profileApiSlice;

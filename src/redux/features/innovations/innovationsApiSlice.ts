import { baseApi } from "../baseApi";
import type { TInnovation, CommentResponse } from "@/lib/types";

const innovationsApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		// * get a list of innovations
		// TODO define return type of the queries builder.query<Innvations[],void> create innovations type
		innovationsFetchMany: builder.query({
			query: (page = 1) => ({
				url: `/api/innovations/?page=${page}`,
				method: "GET",
			}),
			providesTags: ["INNOVATIONS"],
		}),

		// * create an innovation
		innovationsCreate: builder.mutation({
			query: ({
				title,
				description,
				dashboard_type,
				status,
				// banner_image,
				dashboard_link,
				dashboard_id,
				dashboard_image,
				dashboard_definitions,
			}) => {
				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("dashboard_type", dashboard_type);
				formData.append("status", status);
				formData.append("dashboard_link", dashboard_link);
				formData.append("dashboard_id", dashboard_id);

				// if (banner_image instanceof FileList) {
				// 	formData.append("banner_image", banner_image[0]);
				// } else if (banner_image instanceof File) {
				// 	formData.append("banner_image", banner_image);
				// }
				if (dashboard_image instanceof FileList) {
					formData.append("dashboard_image", dashboard_image[0]);
				} else if (dashboard_image instanceof File) {
					formData.append("dashboard_image", dashboard_image);
				}
				if (dashboard_definitions instanceof FileList) {
					formData.append("dashboard_definitions", dashboard_definitions[0]);
				} else if (dashboard_definitions instanceof File) {
					formData.append("dashboard_definitions", dashboard_definitions);
				}

				return {
					url: "/api/innovations/",
					method: "POST",
					body: formData, // send formData instead of JSON
				};
			},
			invalidatesTags: ["INNOVATIONS"],
		}),

		// TODO: Change the route to /api/innnovations/<id>
		// * get one of innovations
		innovationsFetchOne: builder.query<TInnovation, string>({
			query: (id) => ({
				url: `/api/innovations/${id}/`,
				method: "GET",
				// params: { id },
			}),
			providesTags: ["SINGLE_INNOVATION"],
		}),

		//? When using it in the form how will we be able to know when to use patch or put
		// * update an innovation all fields required
		innovationsUpdatePut: builder.mutation({
			query: ({ id, title, description, category, co_authors }) => ({
				url: `/api/innovations/${id}/`,
				method: "PUT",
				// params: { id },
				body: { title, description, category, co_authors },
			}),
		}),

		// *update an innovation not all fields required
		innovationsUpdatePatch: builder.mutation({
			query: ({
				id,
				title,
				description,
				status,
				// banner_image,
				dashboard_link,
				dashboard_image,
				dashboard_definitions,
			}) => {
				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("status", status);
				formData.append("dashboard_link", dashboard_link);

				// if (banner_image instanceof FileList) {
				// 	formData.append("banner_image", banner_image[0]);
				// } else if (banner_image instanceof File) {
				// 	formData.append("banner_image", banner_image);
				// }
				if (dashboard_image instanceof FileList) {
					formData.append("dashboard_image", dashboard_image[0]);
				} else if (dashboard_image instanceof File) {
					formData.append("dashboard_image", dashboard_image);
				}
				if (dashboard_definitions instanceof FileList) {
					formData.append("dashboard_definitions", dashboard_definitions[0]);
				} else if (dashboard_definitions instanceof File) {
					formData.append("dashboard_definitions", dashboard_definitions);
				}

				return {
					url: `/api/innovations/${id}/`,
					method: "PATCH",
					body: formData, // send formData instead of JSON
				};
			},
			invalidatesTags: ["INNOVATIONS"],
		}),

		//* delete an innovation
		innovationsDelete: builder.mutation({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/`,
				method: "DELETE",
				// params: { id },
			}),
			invalidatesTags: ["INNOVATIONS", "SINGLE_INNOVATION"],
		}),

		// TODO: get bookmared innovations: /api/innovations/bookmarks/
		// TODO: like an innovation : /api/innovations/<id>/like/
		// TODO: unlike an innovation: /api/innovations/<id>/unlike/
		// TODO: bookmark an innovation: /api/innovations/<id>/bookmark/
		// TODO: unbookmark an innovation: /api/innovations/<id>/unbookmark/
		// TODO: get innovation comments: /api/innovations/<id>/comments/
		// TODO: create innovation comment: /api/innovations/<id>/comments/
		// TODO: edit innovation comment: /api/innovations/<id>/comments/<id>/
		// TODO: delete innovation comment: /api/innovations/<id>/comments/<id>/

		// * BOOKMARKS
		// ? what is the purpose of this query
		// * list bookmarked innovations
		innovationsBookmarksList: builder.query({
			query: () => ({
				url: "/api/innovations/bookmarks/",
				method: "GET",
			}),
			providesTags: ["BOOKMARK"],
		}),

		// * bookmark an innovation
		innovationsBookmarksCreate: builder.mutation({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/bookmarks/`,
				method: "POST",
			}),
			invalidatesTags: ["BOOKMARK", "SINGLE_INNOVATION", "INNOVATIONS"],
		}),

		// * un-bookmark an innovation
		innovationsUnbookmark: builder.mutation({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/unbookmark/`,
				method: "DELETE",
			}),
			invalidatesTags: ["BOOKMARK", "SINGLE_INNOVATION", "INNOVATIONS"],
		}),

		//* LIKING
		//? like innovation
		innovationsLikes: builder.query({
			query: () => ({
				url: `/api/innovations/likes/`,
				method: "GET",
			}),
		}),

		// * GET innovation likes
		innovationsLikesGet: builder.query({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/likes/`,
				method: "GET",
			}),
		}),

		//* LIKE an innovation
		innovationsLikesCreate: builder.mutation({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/likes/`,
				method: "POST",
			}),
			invalidatesTags: ["LIKE", "SINGLE_INNOVATION", "INNOVATIONS"],
		}),

		//* Unlike an innovation
		innovationsUnlike: builder.mutation({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/unlike/`,
				method: "DELETE",
			}),
			invalidatesTags: ["LIKE", "SINGLE_INNOVATION", "INNOVATIONS"],
		}),

		//* COMMENTS
		// * list innovation comments
		// * list innovation comments
		innovationsCommentsList: builder.query<
			CommentResponse,
			{ id: string; page: number }
		>({
			query: ({ id, page }) => ({
				url: `/api/innovations/${id}/comments/?page=${page}`,
				method: "GET",
			}),
			providesTags: ["COMMENTS"],
		}),

		// * create an innovation comment
		innovationsCommentsCreate: builder.mutation({
			query: ({ id, message }) => ({
				url: `/api/innovations/${id}/comments/`,
				method: "POST",
				body: { text: message },
			}),
			invalidatesTags: ["COMMENTS"],
		}),

		// * Innovations comments read
		innovationsCommentsRead: builder.query({
			query: ({ id, cpk }) => ({
				url: `/api/innovations/${id}/comments/${cpk}/`,
				method: "GET",
			}),
		}),

		// * Innovation comments update (partial)
		innovationsCommentsUpdatePatch: builder.mutation({
			query: ({ id, cpk }) => ({
				url: `/api/innovations/${id}/comments/${cpk}/`,
				method: "PATCH",
			}),
		}),

		// * Innvations comments update(PUT)
		innovationsCommentsUpdatePut: builder.mutation({
			query: ({ id, cpk }) => ({
				url: `/api/innovations/${id}/comments/${cpk}/`,
				method: "PUT",
			}),
		}),

		// * Innvations comments delete
		innovationsCommentsDelete: builder.mutation({
			query: ({ id, cpk }) => ({
				url: `/api/innovations/${id}/comments/${cpk}/`,
				method: "DELETE",
			}),
		}),

		//* Innovations export
		innovationsExportList: builder.query({
			query: ({ id }) => ({
				url: `/api/innovations/${id}/export/`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	//* basic innovations
	useInnovationsCreateMutation,
	useInnovationsDeleteMutation,
	useInnovationsFetchManyQuery,
	useInnovationsFetchOneQuery,
	useInnovationsUpdatePatchMutation,
	useInnovationsUpdatePutMutation,

	//* innovation bookmarks
	useInnovationsBookmarksCreateMutation,
	useInnovationsBookmarksListQuery,
	useInnovationsUnbookmarkMutation,

	//* innovation comments
	useInnovationsCommentsCreateMutation,
	useInnovationsCommentsListQuery,
	useInnovationsCommentsDeleteMutation,
	useInnovationsCommentsUpdatePatchMutation,
	useInnovationsCommentsUpdatePutMutation,
	useInnovationsCommentsReadQuery,

	//* innovation likes
	useInnovationsLikesCreateMutation,
	useInnovationsUnlikeMutation,
	// useInnovationsLikesGetQuery,
	// useInnovationsLikesQuery,

	//* innovation export
	useInnovationsExportListQuery,
} = innovationsApiSlice;

import { baseApi } from "../baseApi";

const dashboardApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		dasboardCreate: builder.mutation({
			query: ({ title, description, category, co_authors }) => ({
				url: "/dashboard/create/",
				method: "POST",
				body: { title, description, category, co_authors },
			}),
		}),
		dasboardUpdate: builder.mutation({
			query: ({ title, description, category, co_authors }) => ({
				url: "/dashboard/create/",
				method: "PUT",
				body: { title, description, category, co_authors },
			}),
		}),
		dashboardDelete: builder.mutation({
			query: ({ }) => ({
				url: "/dashboard/delete/",
				method: "Delete",
				body: { },
			}),
		}),
	}),
});

export const { useDasboardCreateMutation ,useDasboardUpdateMutation , useDashboardDeleteMutation } = dashboardApiSlice
import { baseApi } from "../baseApi";

const authApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		jwtCreate: builder.mutation({
			query: ({ email, password }) => ({
				url: "/auth/jwt/create/",
				method: "POST",
				body: { email, password },
			}),
		}),
		jwtVerify: builder.mutation({
			query: () => ({
				url: "/auth/jwt/verify/",
				method: "POST",
			}),
		}),

		// * logout to delete cookies
		logout: builder.mutation({
			query: ({}) => ({
				url: "/auth/logout/",
				method: "POST",
			}),
		}),
	}),
});

export const { useJwtCreateMutation,useJwtVerifyMutation,useLogoutMutation } = authApiSlice
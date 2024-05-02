import { baseApi } from "../baseApi";

const authApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		jwtCreate: builder.mutation({
			query: ({ email, password }) => ({
				url: "/jwt/create/",
				method: "POST",
				body: { email, password },
			}),
		}),
		verify: builder.mutation({
			query: ({ token }) => ({
				url: "/jwt/verify/",
				method: "POST",
                body:{ token }
			}),
		}),
	}),
});

export const { useJwtCreateMutation } = authApiSlice
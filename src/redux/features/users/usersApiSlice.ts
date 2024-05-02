import { baseApi } from "../baseApi";

const usersApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		users: builder.mutation({
			query: ({
				email,
				first_name,
				last_name,
				password,
				re_passowrd,
			}) => ({
				url: "/users/",
				method: "POST",
				body: { email, first_name, last_name, password, re_passowrd },
			}),
		}),

		usersActivation: builder.mutation({
			query: ({ uid, token }) => ({
				url: "/users/activation/",
				method: "POST",
				body: { uid, token },
			}),
		}),
		resetPassword: builder.mutation({
			query: (email) => ({
				url: "/users/reset_password/",
				method: "POST",
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: "/users/reset_password_confirm/",
				method: "POST",
				body: { uid, token, new_password, re_new_password },
			}),
		}),
	}),
});

export const {
	useUsersMutation,
	useUsersActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = usersApiSlice;

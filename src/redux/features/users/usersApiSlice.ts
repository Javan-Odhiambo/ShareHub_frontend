import { baseApi } from "../baseApi";

const usersApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		
		// * create a user
		users: builder.mutation({
			query: ({
				email,
				password,
				re_password,
			}) => ({
				url: "/auth/users/",
				method: "POST",
				body: { email, password, re_password },
			}),
		}),

		// * activate account 
		usersActivation: builder.mutation({
			query: ({ uid, token }) => ({
				url: "/auth/users/activation/",
				method: "POST",
				body: { uid, token },
			}),
		}),

		// * resend account activation email
		usersResendActivation: builder.mutation({
			query: ({ email }) => ({
				url: "/auth/users/resend_activation/",
				method: "POST",
				body: { email },
			}),
		}),

		// * reset the email => sends an email to the user
		usersResetEmail: builder.mutation({
			query: ({ email }) => ({
				url: "/auth/users/reset_email/",
				method: "POST",
				body: { email },
			}),
		}),

		//? Is it supposed to have uid and token
		// * reset email confirmation =>
		usersRestEmailConfirm: builder.mutation({
			query: ({ new_email }) => ({
				url: "/auth/users/reset_email_confirm/",
				method:"POST",
				body: { new_email }
			}),
		}),

		// * reset password => sends an email 
		resetPassword: builder.mutation({
			query: ({ email }) => ({
				url: "/auth/users/reset_password/",
				method: "POST",
				body: { email },
			}),
		}),

		// * reset password confirm
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: "/auth/users/reset_password_confirm/",
				method: "POST",
				body: { uid, token, new_password, re_new_password },
			}),
		}),

		// * set an email
		// TODO: Remove mutation and places it is referenced
		usersSetEmail: builder.mutation({
			query: ({ current_password, new_email }) => ({
				url: "/auth/users/set_email/",
				method: "POST",
				body: { current_password, new_email },
			}),
		}),

		// * set password
		// TODO: Remove mutation and places it is referenced
		usersSetPasword: builder.mutation({
			query: ({ new_password, re_new_password, current_password }) => ({
				url: "/auth/users/set_password/",
				method: "POST",
				body: { new_password, re_new_password, current_password },
			}),
		}),
	}),
});

export const {
	useUsersMutation,
	useUsersActivationMutation,
	useUsersResendActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
	useUsersResetEmailMutation,
	useUsersRestEmailConfirmMutation,
	useUsersSetEmailMutation,
	useUsersSetPaswordMutation,
} = usersApiSlice;

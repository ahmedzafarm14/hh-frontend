import { emptySplitApi } from "./emptySplitApi.js";

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (form) => ({
        method: "POST",
        url: "/api/user/register/",
        body: form,
      }),
    }),

    login: builder.mutation({
      query: (form) => ({
        method: "POST",
        url: "/api/user/login/",
        body: form,
      }),
    }),

    verifyOTP: builder.mutation({
      query: ({ otp, email, from }) => ({
        method: "POST",
        url: "/api/user/verify-otp/",
        body: {
          email,
          otp,
          from,
        },
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "/user/reset-password-request/",

        body: {
          email,
        },
      }),
    }),

    resetPasswordConfirm: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user/reset-password-confirm/",
        body: data,
      }),
    }),

    resendOTP: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "/api/user/resend-otp/",
        body: { email },
      }),
    }),

    authProvider: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/user/auth-provider/",
      }),
      invalidatesTags: ["LogInStatus"],
    }),

    getProfile: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/user/profile/",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useRequestPasswordResetMutation,
  useResetPasswordConfirmMutation,
  useResendOTPMutation,
  useAuthProviderMutation,
  useGetProfileMutation,
} = userApi;

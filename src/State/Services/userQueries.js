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
        url: "/api/user/reset-password-request/",
        body: {
          email,
        },
      }),
    }),

    resetPasswordConfirm: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/user/reset-password-confirm/",
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

    updateProfile: builder.mutation({
      query: (formData) => ({
        method: "PUT",
        url: "/api/user/update-profile/",
        body: formData,
      }),
      invalidatesTags: ["UserProfile"],
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
  useUpdateProfileMutation,
} = userApi;

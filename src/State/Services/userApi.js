import { emptySplitApi } from "./Api.js";

const apiKey = String(process.env.REACT_APP_API_KEY);

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (form) => ({
        method: "POST",
        url: "/api/user/register/",
        headers: {
          "x-api-key": apiKey,
        },
        body: form,
      }),
    }),

    login: builder.mutation({
      query: (form) => ({
        method: "POST",
        url: "/user/login/",
        headers: {
          "x-api-key": apiKey,
        },
        body: form,
      }),
    }),

    verifyOTP: builder.mutation({
      query: ({ otp, email, from }) => ({
        method: "POST",
        url: "/user/verify-otp/",
        headers: {
          "x-api-key": apiKey,
        },
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
        headers: {
          "x-api-key": apiKey,
        },
        body: {
          email,
        },
      }),
    }),

    resetPasswordConfirm: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user/reset-password-confirm/",
        headers: {
          "x-api-key": apiKey,
        },
        body: data,
      }),
    }),

    resendOTP: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "/user/resend-otp/",
        headers: {
          "x-api-key": apiKey,
        },
        body: { email },
      }),
    }),

    authProvider: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/user/auth-provider/",
        headers: {
          "x-api-key": apiKey,
        },
      }),
      invalidatesTags: ["LogInStatus"],
    }),

    getProfile: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/user/profile/",
        headers: {
          "x-api-key": apiKey,
        },
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

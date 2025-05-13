import { baseApi } from "../../baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/resend-reset-code",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgatePasswordMutation,
  useVerifyPasswordMutation,
  useResendOtpMutation,

  useResetPasswordMutation
} = AuthApi;

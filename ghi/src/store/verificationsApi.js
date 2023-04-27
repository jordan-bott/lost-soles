import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const verificationsApi = createApi({
  reducerPath: "verifications",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log(token);

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  tagTypes: ["Verification"],
  endpoints: (builder) => ({
    getVerifications: builder.query({
      query: () => ({
        url: "/api/verifications",
        credentials: "include",
      }),
      providesTags: ["Verification"],
    }),
    approveVerification: builder.mutation({
      query: (id) => ({
        url: `/api/verifications/${id}/approve`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Verification"],
    }),
    rejectVerification: builder.mutation({
      query: (id) => ({
        url: `/api/verifications/${id}/reject`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Verification"],
    }),
    deleteVerification: builder.mutation({
      query: (id) => ({
        url: `/api/verifications/${id}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Verification"],
    }),
    verifyUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}/verify`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Verification"],
    }),
    unverifyUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}/unverify`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Verification"],
    }),
    createVerification: builder.mutation({
      query: (info) => {
        return {
          url: "/api/verifications",
          method: "post",
          body: info,
          credentials: "include",
        };
      },
      invalidatesTags: ["Verification"],
    }),
  }),
});

export const {
  useGetVerificationsQuery,
  useApproveVerificationMutation,
  useRejectVerificationMutation,
  useDeleteVerificationMutation,
  useVerifyUserMutation,
  useUnverifyUserMutation,
  useCreateVerificationMutation,
} = verificationsApi;

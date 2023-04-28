import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socksApi = createApi({
  reducerPath: "socks",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  endpoints: (builder) => ({
    getSocks: builder.query({
      query: () => "/api/socks",
      providesTags: ["Socks"],
    }),
    getOneSock: builder.query({
      query: (id) => ({
        url: `/api/socks/${id}`,
        credentials: "include",
      }),
      providesTags: ["Socks"],
    }),
    getSocksByUser: builder.query({
      query: (id) => ({
        url: `/api/socks/users/${id}`,
        credentials: "include",
      }),
      providesTags: ["Socks"],
    }),
    deleteSock: builder.mutation({
      query: ({ user_id, sock_id }) => ({
        url: `/api/users/${user_id}/socks/${sock_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
    updateSock: builder.mutation({
      query: ({ user_id, sock_id, info }) => ({
        url: `/api/users/${user_id}/socks/${sock_id}`,
        method: "PUT",
        body: info,
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
    createSock: builder.mutation({
      query: (newSock) => ({
        url: "/api/socks",
        method: "POST",
        body: newSock,
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
    matchPending: builder.mutation({
      query: (id) => ({
        url: `/api/socks/${id}/matches/pending`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
    matched: builder.mutation({
      query: (id) => ({
        url: `/api/socks/${id}/matches/matched`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
    rejected: builder.mutation({
      query: (id) => ({
        url: `/api/socks/${id}/matches/rejected`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
    unmatchedByUser: builder.query({
      query: (id) => ({
        url: `/api/socks/users/${id}/unmatched`,
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
  }),
});

export const {
  useGetSocksQuery,
  useGetOneSockQuery,
  useGetSocksByUserQuery,
  useDeleteSockMutation,
  useUpdateSockMutation,
  useCreateSockMutation,
  useMatchPendingMutation,
  useMatchedMutation,
  useRejectedMutation,
  useUnmatchedByUserQuery,
} = socksApi;

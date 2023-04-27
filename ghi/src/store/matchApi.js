import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const matchesApi = createApi({
  reducerPath: "matches",
  tagTypes: ["Matches"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
    credentials: "include",
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  endpoints: (builder) => ({
    createMatch: builder.mutation({
      query: ({ receive_sock, gift_sock, approving_id }) => ({
        url: `api/matches?receive_sock=${receive_sock}&gift_sock=${gift_sock}&approving_id=${approving_id}`,
        method: "post",
        credentials: "include",
      }),
      invalidatesTags: ["Matches"],
    }),
    getMatchByUser: builder.query({
      query: (requesting_user) => ({
        url: `api/matches/users/${requesting_user}`,
        method: "get",
        credentials: "include",
      }),
      providesTags: ["Matches"],
    }),
    getOneMatch: builder.query({
      query: ({ id, user_id }) => ({
        url: `/api/matches/${id}?user_id=${user_id}`,
        credentials: "include",
      }),
      providesTags: ["Matches"],
    }),
    approveMatch: builder.mutation({
      query: (match_id) => ({
        url: `/api/matches/${match_id}`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["Matches"],
    }),
    rejectMatch: builder.mutation({
      query: ({ match_id, requesting_user, approving_user }) => ({
        url: `/api/matches/${match_id}?requesting_user=${requesting_user}&approving_user=${approving_user}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Matches"],
    }),
  }),
});

export const {
  useCreateMatchMutation,
  useGetMatchByUserQuery,
  useGetOneMatchQuery,
  useApproveMatchMutation,
  useRejectMatchMutation,
} = matchesApi;

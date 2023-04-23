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
      query: ({ user_id, sock_id }) => ({
        url: `/api/users/${user_id}/socks/${sock_id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Socks"],
    }),
  }),
});

export const {
  useGetSocksQuery,
  useDeleteSockMutation,
  useGetSocksByUserQuery,
  useUpdateSockMutation,
} = socksApi;

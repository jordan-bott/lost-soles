import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["User"],
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
    getUsers: builder.query({
      query: () => ({
        url: "/api/users",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/api/users/${id}`,
        credentials: "include",
      }),

      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    addSockstar: builder.mutation({
      query: ({ user_id, points }) => ({
        url: `/api/users/${user_id}/sockstar?points=${points}`,
        method: "put",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useAddSockstarMutation,
} = usersApi;

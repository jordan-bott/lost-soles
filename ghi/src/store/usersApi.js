import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/api/users/${id}`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = usersApi;

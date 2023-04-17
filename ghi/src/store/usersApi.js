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
    createUser: builder.mutation({
      query: (info) => {
        let formData = {};
        formData["first_name"] = info.first_name;
        formData["last_name"] = info.last_name;
        formData["username"] = info.username;
        formData["password"] = info.password;
        formData["password_confirmation"] = info.password_confirmation;
        formData["email"] = info.email;
        formData["address"] = info.address;
        formData["profile_pic"] = info.profile_pic;
        return {
          url: "api/users",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation } = usersApi;

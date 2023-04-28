import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authentication",
  tagTypes: ["Token"],
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
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.username);
          formData.append("password", info.password);
        }
        return {
          url: "/token",

          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",

        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Token"],
    }),
    createUser: builder.mutation({
      query: (info) => {
        return {
          url: "api/users",
          method: "post",
          body: info,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),
    createAdmin: builder.mutation({
      query: (info) => {
        return {
          url: "api/users/admin",
          method: "post",
          body: info,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),
    updateUser: builder.mutation({
      query: ({ id, info }) => ({
        url: `api/users/${id}`,
        method: "put",
        body: info,
        credentials: "include",
      }),
      invalidatesTags: ["Token"],
    }),
  }),
});

// const baseQuery = fetchBaseQuery({
//   baseUrl: "/",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;

//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

export const {
  useLoginMutation,
  useGetTokenQuery,
  useLogoutMutation,
  useCreateUserMutation,
  useCreateAdminMutation,
  useUpdateUserMutation,
} = authApi;

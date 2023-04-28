import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emailApi = createApi({
  reducerPath: "emails",
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
    sendRequest: builder.mutation({
      query: ({ user_email, match_id }) => ({
        url: `/api/email/request?user_email=${user_email}&match_id=${match_id}`,
        method: "post",
        credentials: "include",
      }),
    }),
    sendReceive: builder.mutation({
      query: ({ user_email, username }) => ({
        url: `/api/email/receive?user_email=${user_email}&username=${username}`,
        method: "post",
        credentials: "include",
      }),
    }),
    sendGift: builder.mutation({
      query: ({ user_email, username, user_address }) => ({
        url: `/api/email/send?user_email=${user_email}&username=${username}&user_address=${user_address}`,
        method: "post",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSendRequestMutation,
  useSendReceiveMutation,
  useSendGiftMutation,
} = emailApi;

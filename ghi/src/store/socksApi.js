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
  }),
});

export const { useGetSocksQuery } = socksApi;

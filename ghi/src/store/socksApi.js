import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socksApi = createApi({
  reducerPath: "socks",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
  }),
  endpoints: (builder) => ({
    getSocks: builder.query({
      query: () => "/api/socks",
    }),
  }),
});

export const { useGetSocksQuery } = socksApi;

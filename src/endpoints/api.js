import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "guestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 60,
  tagTypes: ['Auth', 'Parlays', 'MyParlays', 'Drafts'],
  endpoints: (builder) => ({
    getAuth: builder.query({
      query: () => ({
        url: 'auth',
      }),
      providesTags: ['Auth']
    }),
  }),
});

export const { useGetAuthQuery } = api;

export default api;

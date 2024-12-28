import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "guestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000/v1/",
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
  tagTypes: ["Auth", "Parlays", "MyParlays", "Drafts", "Parlay"],
  endpoints: (builder) => ({
    getAuth: builder.query({
      query: () => ({
        url: "auth",
      }),
      providesTags: ["Auth"],
    }),
    fundWallet: builder.mutation({
      query: (body) => ({
        url: "wallet/fund",
        method: "POST",
        body,
      }),
    }),
    verifyFunding: builder.mutation({
      query: (body) => ({
        url: `wallet/verify/${body.reference}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetAuthQuery,
  useFundWalletMutation,
  useVerifyFundingMutation,
} = api;

export default api;

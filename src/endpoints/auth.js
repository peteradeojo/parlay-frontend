import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "./api";

const guestApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000/v1/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = guestApi;

export default guestApi;

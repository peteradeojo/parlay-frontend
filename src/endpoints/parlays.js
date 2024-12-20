import api from "./api";

const parlaysApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    myParlays: builder.query({
      query: () => ({
        url: "/parlays",
      }),
      providesTags: ["MyParlays"],
    }),
    topParlays: builder.query({
      query: () => ({
        url: "parlays/top",
      }),
      providesTags: ["Parlays"],
    }),
    createParlay: builder.mutation({
      query: (body) => ({
        url: "parlays/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyParlays"],
    }),
  }),
});

export const { useTopParlaysQuery, useCreateParlayMutation } = parlaysApi;

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
      invalidatesTags: ["MyParlays", "Drafts", "Parlays"],
    }),
    getDrafts: builder.query({
      query: () => ({
        url: "parlays/drafts",
      }),
      providesTags: ["Drafts"],
    }),
    getParlay: builder.query({
      query: (id) => ({
        url: `parlays/${id}`,
      }),
      providesTags: (result) =>
        result ? [{ type: "Parlay", id: result.id }] : ["Parlay"],
    }),
    updateParlay: builder.mutation({
      query: (parlay) => ({
        url: `parlays/${parlay.id}`,
        method: "PATCH",
        body: parlay,
      }),
      invalidatesTags: (result, error, arg) => [
        "Drafts",
        { type: "Parlay", id: arg.id },
      ],
    }),
  }),
});

export const {
  useTopParlaysQuery,
  useCreateParlayMutation,
  useGetDraftsQuery,
  useGetParlayQuery,
  useUpdateParlayMutation,
} = parlaysApi;

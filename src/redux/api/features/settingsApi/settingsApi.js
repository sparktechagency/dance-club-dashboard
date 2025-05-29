import { baseApi } from "../../baseApi";

const SeetingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/manage/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["Privacy"],
    }),

    createPrivacy: builder.mutation({
      query: (data) => ({
        url: "/manage/add-privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery,useCreatePrivacyMutation } = SeetingsApi;

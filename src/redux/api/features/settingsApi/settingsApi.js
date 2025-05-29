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

    getTremCondition: builder.query({
      query: () => ({
        url: "/manage/get-terms-conditions",
        method: "GET",
      }),
      providesTags: ["TremCondition"],
    }),
    createTermsCOndition: builder.mutation({
      query: (data) => ({
        url: "/manage/add-terms-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TremCondition"],
    }),
  }),
});

export const {
  useGetPrivacyQuery,
  useCreatePrivacyMutation,
  useGetTremConditionQuery,
  useCreateTermsCOnditionMutation
} = SeetingsApi;

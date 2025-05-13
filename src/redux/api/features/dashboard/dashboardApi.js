import { TAGS } from "../../../tag.type";
import { baseApi } from "../../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/meta/get-dashboard-meta-data",
        method: "GET",
      }),
      providesTags: TAGS.ANALYTICS_TAG,
    }),
  }),
});

export const { useGetAnalyticsQuery } = dashboardApi;

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

    getUserChartData: builder.query({
      query: ({params}) => ({
        url: "/meta/user-chart-data",
        method: "GET",
        params
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery,useGetUserChartDataQuery } = dashboardApi;

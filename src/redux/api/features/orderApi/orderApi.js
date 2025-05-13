import { baseApi } from "../../baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newOrderOnDashboard: builder.query({
      query: ({ page, limit }) => ({
        url: `/order/all-orders?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useNewOrderOnDashboardQuery } = OrderApi;

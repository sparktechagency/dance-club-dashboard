import { TAGS } from "../../../tag.type";
import { baseApi } from "../../baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newOrderOnDashboard: builder.query({
      query: ({ page, limit }) => ({
        url: `/order/all-orders?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: [TAGS.ORDER_TAG],
    }),

    getSingleOrder: builder.query({
      query: (_id) => ({
        url: `/order/single-order/${_id}`,
        method: "GET",
      }),
      providesTags: [TAGS.ORDER_TAG],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/change-order-status/${id}`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: [TAGS.ORDER_TAG],
    }),
  }),
});

export const {
  useNewOrderOnDashboardQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = OrderApi;

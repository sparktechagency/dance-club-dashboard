import { baseApi } from "../../baseApi";

const CouponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: ({ page, limit }) => ({
        url: `coupon/get-all-coupons?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),

    createCoupon: builder.mutation({
      query: (data) => ({
        url: `coupon/create-coupon`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const { useGetCouponQuery , useCreateCouponMutation} = CouponApi;

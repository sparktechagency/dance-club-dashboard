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

    editCoupon: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/coupon/update-coupon/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/delete-coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetCouponQuery,
  useCreateCouponMutation,
  useEditCouponMutation,
  useDeleteCouponMutation,
} = CouponApi;

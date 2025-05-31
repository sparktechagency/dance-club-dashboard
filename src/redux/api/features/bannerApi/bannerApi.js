import { baseApi } from "../../baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner/get-all-banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/banner/create-banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation({
      query: (_id) => ({
        url: `/banner/delete-banner/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const { useGetAllBannerQuery, useCreateBannerMutation, useDeleteBannerMutation } = bannerApi;

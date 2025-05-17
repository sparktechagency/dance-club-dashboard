import { baseApi } from "../../baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: ({ page, limit }) => ({
        url: `/category/all-categories?page=${page}&limit&=${limit}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `/category/create-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: ({_id}) => ({
        url: `/category/delete-category/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation ,useDeleteCategoryMutation} =
  CategoryApi;

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
    getCategoryForProduct: builder.query({
      query: () => ({
        url: `/category/all-categories`,
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
      query: ({ _id }) => ({
        url: `/category/delete-category/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, formData }) => ({
        url: `/category/update-category/${categoryId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetCategoryForProductQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = CategoryApi;

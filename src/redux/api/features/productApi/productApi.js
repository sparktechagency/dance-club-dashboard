import { baseApi } from "../../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: ({ page, limit, searchTerm,  }) => ({
        url: `/product/all-products?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (_id) => ({
        url: `/product/single-product/${_id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    editProduct: builder.mutation({
      query: ({_id,data}) => ({
        url: `/product/update-product/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/product/delete-product/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useGetSingleProductQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;






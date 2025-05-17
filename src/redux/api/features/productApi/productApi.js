import { baseApi } from "../../baseApi";

const productApi=baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: ({ page, limit ,isAvailable,searchTerm,category}) => ({
                url: `/product/all-products?searchTerm=${searchTerm}&category=${category}&isAvailable=${isAvailable}&page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
    }),
});
export const { useGetAllProductQuery } = productApi;
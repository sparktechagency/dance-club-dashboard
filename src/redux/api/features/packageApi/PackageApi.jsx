import { baseApi } from "../../baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackage: builder.query({
      query: ({page,limit}) => ({
        url: `/package/get-all-packages?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/package/create-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),
    getSInglePackage: builder.query({
      query: (_id) => ({
        url: `/package/get-single-package/${_id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    updatePackage: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/package/update-package/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: (_id) => ({
        url: `/package/delete-package/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useGetAllPackageQuery,
  useCreatePackageMutation,
  useGetSInglePackageQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;

import { TAGS } from "../../../tag.type";
import { baseApi } from "../../baseApi";

const ClassesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClasses: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/class/get-all-class?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: [TAGS.CLASS_TAG],
    }),
    craeteClass: builder.mutation({
      query: (data) => ({
        url: `/class/create-class`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TAGS.CLASS_TAG],
    }),

    updateClass: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/class/update-class/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [TAGS.CLASS_TAG],
    }),
  }),
});

export const {
  useGetAllClassesQuery,
  useCraeteClassMutation,
  useUpdateClassMutation,
} = ClassesApi;

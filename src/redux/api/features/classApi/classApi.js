import { TAGS } from "../../../tag.type";
import { baseApi } from "../../baseApi";

const ClassesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClasses: builder.query({
      query: ({ page, limit }) => ({
        url: `/class/get-all-class?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: TAGS.CLASS_TAG,
    }),
    craeteClass: builder.mutation({
      query: (data) => {
        return {
          url: `/class/create-class`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: TAGS.CLASS_TAG,
    }),
  }),
});

export const { useGetAllClassesQuery, useCraeteClassMutation } = ClassesApi;

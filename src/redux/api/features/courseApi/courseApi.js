import { baseApi } from "../../baseApi";

const CourseAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ({
        url: "/course/get-all-course",
      }),
      providesTags: ["Course"],
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getCourseById: builder.query({
      query: (_id) => ({
        url: `/course/get-single-course/${_id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    updateCourse: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/course/update-course/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteCourse: builder.mutation({
      query: (_id) => ({
        url: `/course/delete-course/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});
export const {
  useGetAllCourseQuery,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = CourseAPi;

import { baseApi } from "../../baseApi";

const CourseAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ({
        url: "/course/get-all-course",
      }),
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
      query: (id) => ({
        url: `/course/${id}`,
      }),
    }),
  }),
});
export const {
  useGetAllCourseQuery,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
} = CourseAPi;

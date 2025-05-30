import { baseApi } from "../../baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: () => ({
        url: "/feedback/all-feedbacks",
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),

    deleteFeedback: builder.mutation({
      query: (_id) => ({
        url: `/feedback/delete-feedback/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),



  }),
});

export const { useGetAllFeedbackQuery,useDeleteFeedbackMutation } = feedbackApi;

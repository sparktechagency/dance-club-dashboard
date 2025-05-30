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
  }),
});

export const { useGetAllFeedbackQuery } = feedbackApi;

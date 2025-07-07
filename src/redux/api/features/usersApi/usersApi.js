import { baseApi } from "../../baseApi";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/normal-user/get-all-user",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    blockUser: builder.mutation({
      query: (_id) => ({
        url: `/user/change-status/${_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = UsersApi;

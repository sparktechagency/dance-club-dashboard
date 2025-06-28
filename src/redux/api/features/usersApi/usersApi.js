import { baseApi } from "../../baseApi";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/normal-user/get-all-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = UsersApi;

import { baseApi } from "../../baseApi";

const ClassesApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClasses: builder.query({
            query: ({ page, limit}) => ({
                url:`/class/get-all-class?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetAllClassesQuery } = ClassesApi
import { baseApi } from "../../baseApi";

const packageApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllPackage:builder.query({
            query:()=>({
                url:"/package/get-all-packages",
                method:"GET"
            }),
            providesTags:["Package"]
        }),
        createPackage:builder.mutation({
            query:(data)=>({
                url:"/package/create-package",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Package"]
        })
    })
})

export const { useGetAllPackageQuery, useCreatePackageMutation } = packageApi;

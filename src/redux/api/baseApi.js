import { fetchBaseQuery,createApi  } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/baseUrl";
import { message } from "antd";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("token", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 400) {
    message.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 404) {
    message.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 403) {
    message.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 401) {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: api.getState().auth.refreshToken,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data?.data?.accessToken) {
      localStorage.setItem("accessToken", data?.data?.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      // localStorage.removeItem("user");
    }
    return result;
  }
};

export const baseAPi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

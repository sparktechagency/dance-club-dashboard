import { baseApi } from "../../baseApi";

const BookingAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBooking: builder.query({
      query: ({ limit, page, searchTerm }) => ({
        url: `/class-book/all-bookings?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags:["bookings"]
    }),
  }),
});

export const { useAllBookingQuery } = BookingAPi;

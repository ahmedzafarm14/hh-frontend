import { emptySplitApi } from "./emptySplitApi.jsx";

export const bookingApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: "/api/booking/create-booking/",
        body: formData,
      }),
    }),

    getResidentBookings: builder.query({
      query: (residentId) => ({
        method: "GET",
        url: `/api/booking/resident-bookings/${residentId}`,
      }),
      providesTags: ["Bookings"],
    }),

    getOwnerBookings: builder.query({
      query: (ownerId) => ({
        method: "GET",
        url: `/api/booking/owner-bookings/${ownerId}`,
      }),
      providesTags: ["OwnerBookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetResidentBookingsQuery,
  useGetOwnerBookingsQuery,
} = bookingApi;

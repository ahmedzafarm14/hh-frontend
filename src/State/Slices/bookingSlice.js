import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  ownerBookings: [],
};

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload || [];
    },

    addBooking: (state, action) => {
      // Ensure bookings array exists, if not initialize it
      if (!state.bookings) {
        state.bookings = [];
      }
      state.bookings.push(action.payload);
    },

    clearBookings: (state) => {
      state.bookings = [];
    },

    residentBookings: (state, action) => {
      state.bookings = action.payload || [];
    },

    removeBookings: (state, action) => {
      if (state.bookings) {
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
      }
    },

    // Owner bookings actions
    setOwnerBookings: (state, action) => {
      state.ownerBookings = action.payload || [];
    },

    addOwnerBooking: (state, action) => {
      if (!state.ownerBookings) {
        state.ownerBookings = [];
      }
      state.ownerBookings.push(action.payload);
    },

    clearOwnerBookings: (state) => {
      state.ownerBookings = [];
    },

    removeOwnerBooking: (state, action) => {
      if (state.ownerBookings) {
        state.ownerBookings = state.ownerBookings.filter(
          (booking) => booking._id !== action.payload
        );
      }
    },
  },
});

export const {
  setBookings,
  addBooking,
  clearBookings,
  removeBookings,
  residentBookings,
  setOwnerBookings,
  addOwnerBooking,
  clearOwnerBookings,
  removeOwnerBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;

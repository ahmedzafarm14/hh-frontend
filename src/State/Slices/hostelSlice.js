import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hostels: [],
};

export const hostelSlice = createSlice({
  name: "hostelSlice",
  initialState,
  reducers: {
    setHostels: (state, action) => {
      state.hostels = action.payload;
    },

    addHostel: (state, action) => {
      state.hostels.push(action.payload);
    },

    clearHostels: (state) => {
      state.hostels = [];
    },

    residentHostels: (state, action) => {
      state.hostels = action.payload;
    },

    removeHostel: (state, action) => {
      state.hostels = state.hostels.filter(
        (hostel) => hostel._id !== action.payload
      );
    },
  },
});

export const {
  setHostels,
  addHostel,
  clearHostels,
  removeHostel,
  residentHostels,
} = hostelSlice.actions;

export default hostelSlice.reducer;

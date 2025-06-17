import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
  user: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUser, setTrueLoginStatus, setFalseLoginStatus, removeUser } =
  userSlice.actions;

export default userSlice.reducer;

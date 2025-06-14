import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  user: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTrueLoginStatus: (state, action) => {
      state.loginStatus = true;
    },
    setFalseLoginStatus: (state, action) => {
      state.loginStatus = false;
    },
    removeUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUser, setTrueLoginStatus, setFalseLoginStatus, removeUser } =
  userSlice.actions;

export default userSlice.reducer;

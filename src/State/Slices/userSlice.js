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
      const { token, role, user } = action.payload;
      state.token = token;
      state.role = role;
      state.user = user;
    },
    clearUser: (state) => {
      state.user = {};
      state.token = null;
      state.role = null;
    },
    updateUserData: (state, action) => {
      const updatedUserData = action.payload;
      state.user = {
        ...state.user,
        ...updatedUserData,
      };
    },
  },
});

export const { setUser, clearUser, updateUserData } = userSlice.actions;

export default userSlice.reducer;

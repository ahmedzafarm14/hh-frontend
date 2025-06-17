import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: null,
};

export const tabHandlerSlice = createSlice({
  name: "tabHandlerSlice",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    clearCurrentTab: (state) => {
      state.currentTab = null;
    },
  },
});

export const { setCurrentTab, clearCurrentTab } = tabHandlerSlice.actions;
export default tabHandlerSlice.reducer;

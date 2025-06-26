import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: null,
  toggleSidebar: false,
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
    setToggleSidebar: (state) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
  },
});

export const { setCurrentTab, clearCurrentTab, setToggleSidebar } =
  tabHandlerSlice.actions;
export default tabHandlerSlice.reducer;

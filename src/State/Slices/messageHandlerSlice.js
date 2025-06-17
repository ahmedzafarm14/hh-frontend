import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: null,
  successMessage: null,
};

export const messageHandlerSlice = createSlice({
  name: "messageHandlerSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearMessages: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
});
export const { setErrorMessage, setSuccessMessage, clearMessages } =
  messageHandlerSlice.actions;

export default messageHandlerSlice.reducer;

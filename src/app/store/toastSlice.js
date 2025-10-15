import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      const { message, type } = action.payload;
      state.push({ id: Date.now(), message, type });
    },
    hideToast: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    clearToasts: () => [],
  },
});

export const { showToast, hideToast, clearToasts } = toastSlice.actions;
export default toastSlice;

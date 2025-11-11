import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      const { message, type, id } = action.payload;
      if (!message || message.trim().length === 0) return;
      state.push({ id: id || Date.now() + Math.random(), message, type });
    },

    hideToast: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, hideToast, clearToasts } = toastSlice.actions;
export default toastSlice;

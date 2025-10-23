import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      const { message, type, id } = action.payload;
      if (!message || message.trim().length === 0) return;
      const exists = state.some(
        (t) => t.message === message && t.type === type
      );
      if (!exists) {
        state.push({ id: id || Date.now(), message, type });
      }
    },
    hideToast: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, hideToast, clearToasts } = toastSlice.actions;
export default toastSlice;

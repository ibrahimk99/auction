import { createSlice } from "@reduxjs/toolkit";
let nextId = 1;
const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      state.push({
        id: nextId++,
        message: action.payload.message,
        type: action.payload.type || "success",
      });
    },
    hideToast: (state, action) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: () => [],
  },
});

export const { showToast, hideToast, clearToasts } = toastSlice.actions;
export default toastSlice;

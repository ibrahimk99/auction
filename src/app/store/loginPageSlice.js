import { createSlice } from "@reduxjs/toolkit";

const loginPageSlice = createSlice({
  name: "loginPage",
  initialState: true,
  reducers: {
    setLogin: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});
export const loginPageAction = loginPageSlice.actions;
export default loginPageSlice;

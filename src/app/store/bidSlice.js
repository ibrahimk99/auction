import { createSlice } from "@reduxjs/toolkit";
const bidSlice = createSlice({
  name: "bid",
  initialState: [],
  reducers: {
    addBid: (state, action) => {
      console.log(" add auctionb", action.payload);
      return action.payload;
    },
  },
});

export const bidAction = bidSlice.actions;
export default bidSlice;

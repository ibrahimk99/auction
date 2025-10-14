import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
  name: "auction",
  initialState: [],
  reducers: {
    addAuction: (state, action) => {
      console.log("add auction", action.payload);
      return action.payload;
    },
    removeAuction: (state, action) => {
      console.log("remove cart item", action.payload);
    },
    destroyAuction: () => undefined,
  },
});
export const auctionAction = auctionSlice.actions;
export default auctionSlice;

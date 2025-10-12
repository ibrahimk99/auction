import { configureStore } from "@reduxjs/toolkit";
import auctionSlice from "./auctionSlice";
import bidSlice from "./bidSlice";

const auctionStore = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
    bid: bidSlice.reducer,
  },
});
export default auctionStore;

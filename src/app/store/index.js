import { configureStore } from "@reduxjs/toolkit";
import auctionSlice from "./auctionSlice";
import bidSlice from "./bidSlice";
import fetchStatusSlice from "./fetchStatusSlice";

const auctionStore = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
    bid: bidSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
  },
});
export default auctionStore;

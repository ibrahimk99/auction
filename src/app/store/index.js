import { configureStore } from "@reduxjs/toolkit";
import auctionSlice from "./auctionSlice";
import bidSlice from "./bidSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import toastSlice from "./toastSlice";

const auctionStore = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
    bid: bidSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    toast: toastSlice.reducer,
  },
});
export default auctionStore;

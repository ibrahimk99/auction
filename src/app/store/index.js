import { configureStore } from "@reduxjs/toolkit";
import auctionSlice from "./auctionSlice";
import bidSlice from "./bidSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import toastSlice from "./toastSlice";
import loginPageSlice from "./loginPageSlice";
import addToWatchSlice from "./addToWatchSlice";

const auctionStore = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
    bid: bidSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    toast: toastSlice.reducer,
    loginPage: loginPageSlice.reducer,
    addToWatch: addToWatchSlice.reducer,
  },
});
export default auctionStore;

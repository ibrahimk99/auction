import { configureStore } from "@reduxjs/toolkit";
import auctionSlice from "./auctionSlice";
import bidSlice from "./bidSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import toastSlice from "./toastSlice";
import loginPageSlice from "./loginPageSlice";

const auctionStore = configureStore({
  reducer: {
    auction: auctionSlice.reducer,
    bid: bidSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    toast: toastSlice.reducer,
    loginPage: loginPageSlice.reducer,
  },
});
export default auctionStore;

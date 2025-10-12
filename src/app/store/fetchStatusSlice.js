import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetchDone: false,
    currentlyFetching: false,
  },
  reducers: {
    markFetchDone: (state) => {
      state.fetchDone = true;
      console.log("fetch done");
    },
    markFetchingStarted: (state) => {
      state.currentlyFetching = true;
      console.log("fetch started");
    },
    markFetchingFinished: (state) => {
      state.currentlyFetching = false;
      console.log("fetch finished");
    },
  },
});

export const fetchStatusActions = fetchStatusSlice.actions;
export default fetchStatusSlice;

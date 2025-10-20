import { createSlice } from "@reduxjs/toolkit";
const store = localStorage.getItem("watchlist-id");
const setStore = (data) => {
  localStorage.setItem("watchlist-id", JSON.stringify(data));
};
const addToWatchSlice = createSlice({
  name: "addToWatch",
  initialState: (store && JSON.parse(store)) || [],
  reducers: {
    setWatchList: (state, action) => {
      console.log(action);
      const id = action.payload;
      if (!state.includes(id)) {
        state.push(id);
        setStore(state);
      }
    },

    removeFromWatchList: (state, action) => {
      const id = action.payload;
      const updatedList = state.filter((item) => item !== id);
      setStore(updatedList);
      return updatedList;
    },
  },
});
export const addToWatchAction = addToWatchSlice.actions;
export default addToWatchSlice;

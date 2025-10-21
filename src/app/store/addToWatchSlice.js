import { createSlice } from "@reduxjs/toolkit";

const getStoredWatchlist = (userId) => {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const stored = localStorage.getItem(`watchlist-${userId}`);
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setStoredWatchlist = (userId, data) => {
  if (typeof window !== "undefined" && userId) {
    localStorage.setItem(`watchlist-${userId}`, JSON.stringify(data));
  }
};

const removeStoredWatchlist = (userId) => {
  if (typeof window !== "undefined" && userId) {
    localStorage.removeItem(`watchlist-${userId}`);
  }
};

const addToWatchSlice = createSlice({
  name: "addToWatch",
  initialState: {
    userId: null,
    watchlist: [],
  },

  reducers: {
    initWatchList: (state, action) => {
      console.log("initWatchList", { state, action });
      const userId = action.payload;
      const stored = getStoredWatchlist(userId);
      state.userId = userId;
      state.watchlist = stored;
    },

    setWatchList: (state, action) => {
      console.log("setWatchList", { state, action });
      const { userId, ids } = action.payload;
      const array = Array.isArray(ids) ? ids : [ids];
      setStoredWatchlist(userId, array);
      state.userId = userId;
      state.watchlist = array;
    },

    addToWatch: (state, action) => {
      console.log("addToWatch", { state, action });
      const { userId, aucId } = action.payload;
      if (!state.watchlist.includes(aucId)) {
        const updated = [...state.watchlist, aucId];
        setStoredWatchlist(userId, updated);
        state.userId = userId;
        state.watchlist = updated;
      }
    },

    removeFromWatchList: (state, action) => {
      console.log("removeFromWatch", { state, action });
      const { userId, aucId } = action.payload;
      const updated = state.watchlist.filter((item) => item !== aucId);
      setStoredWatchlist(userId, updated);
      state.userId = userId;
      state.watchlist = updated;
    },

    clearWatchList: (state, action) => {
      console.log("clearWatchList", { state, action });
      const userId = action.payload;
      removeStoredWatchlist(userId);
      state.userId = userId;
      state.watchlist = [];
    },
  },
});

export const addToWatchAction = addToWatchSlice.actions;
export default addToWatchSlice;

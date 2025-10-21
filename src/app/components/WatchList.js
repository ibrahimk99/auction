"use client";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { safeFetch } from "../utils/safeFetch";
import { useCallback, useEffect, useState } from "react";

const WatchList = ({ aucId }) => {
  const [watchList, setWatchList] = useState([]);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const addToWatch = async () => {
    const data = await safeFetch(
      "/api/watchlist",
      dispatch,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          auctions: aucId,
        }),
      },
      "watchlist-updated",
      null
    );
    if (data) {
      setWatchList((prev) => [...prev, aucId]);
    }
  };

  const removeFromWatch = async () => {
    const data = await safeFetch(
      "/api/watchlist/" + aucId,
      dispatch,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      "watchlist-removed",
      null
    );
    if (data) {
      setWatchList((prev) => prev.filter((id) => id !== aucId));
    }
  };
  const fetchIds = useCallback(
    async (signal) => {
      const data = await safeFetch(
        "/api/watchlist/" + userId,
        null,
        {},
        null,
        signal
      );
      if (data) {
        const idsData = data.auctions.map((item) => item._id);
        setWatchList(idsData);
      }
    },
    [userId]
  );

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    const signal = controller.signal;
    fetchIds(signal);
    return () => controller.abort();
  }, [userId, fetchIds]);

  const isInWatchList = watchList.includes(aucId);
  return (
    <>
      {isInWatchList ? (
        <button
          onClick={removeFromWatch}
          className="btn btn-outline-danger w-100"
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          onClick={addToWatch}
          className="btn btn-outline-secondary w-100"
        >
          Add to Watchlist
        </button>
      )}
    </>
  );
};

export default WatchList;

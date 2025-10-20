import { useDispatch, useSelector } from "react-redux";
import { addToWatchAction } from "../store/addToWatchSlice";
import { useSession } from "next-auth/react";
import { safeFetch } from "../utils/safeFetch";

const WatchList = ({ id }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const watchList = useSelector((state) => state.addToWatch);
  console.log({ watchList });
  const addToWatch = async () => {
    const data = await safeFetch(
      "/api/watchlist",
      dispatch,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: session.user.id,
          auctions: id,
        }),
      },
      "watchlist-updated",
      null
    );

    if (data.modifiedCount > 0) {
      dispatch(addToWatchAction.setWatchList(id));
    }
  };

  const removeFromWatch = async () => {
    const data = await safeFetch(
      "/api/watchlist/" + id,
      dispatch,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      "watchlist-removed",
      null
    );
    if (data) {
      dispatch(addToWatchAction.removeFromWatchList(id));
    }
  };
  const isInWatchlist = watchList.includes(id);

  return (
    <>
      {isInWatchlist ? (
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

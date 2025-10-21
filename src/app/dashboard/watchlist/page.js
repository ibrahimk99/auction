"use client";
import { safeFetch } from "@/app/utils/safeFetch";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WatchList = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const userId = session?.user?.id;
  const [favourites, setFavourites] = useState([]);
  const router = useRouter();

  const fetchWatchList = useCallback(
    async (signal) => {
      const data = await safeFetch(
        "/api/watchlist/" + userId,
        dispatch,
        {
          method: "GET",
          credentials: "include",
        },
        "fetch-watchlist",
        signal
      );
      if (data) {
        setFavourites(data.auctions);
      }
    },
    [userId, dispatch]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!userId) return; //
    fetchWatchList(signal);
    return () => controller.abort();
  }, [userId, dispatch, fetchWatchList]);

  const clearWatchList = async () => {
    const data = await safeFetch(
      "/api/watchlist/",
      dispatch,
      {
        method: "DELETE",
      },
      "fetch-watchlist",
      null
    );
    if (data) {
      setFavourites([]);
    }
  };
  return (
    <div>
      <Header />
      <button onClick={clearWatchList}>Clear WacthList</button>
      <div className="container mt-4">
        {favourites.length > 0 ? (
          <div className="row">
            {favourites.map((favourite, idx) => (
              <div
                className="col-lg-3 col-md-6 col-sm-8 col-12 mb-4"
                key={idx + 1}
              >
                <div
                  className="card shadow-sm h-100"
                  onClick={() => router.push("/home/" + favourite._id)}
                >
                  <Image
                    src={favourite.images}
                    className="card-img-top"
                    alt={favourite.title}
                    width={200}
                    height={200}
                    priority
                    objectFit="cover"
                  />

                  <div className="card-body">
                    <h5 className="card-title">{favourite.title}</h5>
                    <p className="card-text text-muted">
                      {favourite.description}
                    </p>

                    <p className="mb-1">
                      <span className="fw-bold">💰 Starting:</span>{" "}
                      {favourite.startingPrice} PKR
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">💰 Current:</span>{" "}
                      {favourite.currentPrice} PKR
                    </p>

                    <p className="mb-1">
                      ⏰ <span className="fw-bold">Start:</span>{" "}
                      {new Date(favourite.startTime).toLocaleString()}
                    </p>
                    <p className="mb-2">
                      ⏳ <span className="fw-bold">End:</span>{" "}
                      {new Date(favourite.endTime).toLocaleString()}
                    </p>
                    <span
                      className={`badge ${
                        favourite.status === "active"
                          ? "bg-success"
                          : favourite.status === "upcoming"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {favourite.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4 className="text-center text-muted mt-5">No Auction Available</h4>
        )}
      </div>
    </div>
  );
};

export default WatchList;

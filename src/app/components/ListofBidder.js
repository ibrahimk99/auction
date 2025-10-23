"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { safeFetch } from "../utils/safeFetch";

export default function ListofBidder({ bidPrice }) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { auctionId } = params;
  const dispatch = useDispatch();

  const fetchBids = useCallback(
    async (signal) => {
      const data = await safeFetch(
        `/api/biding/${auctionId}`,
        dispatch,
        {},
        Date.now(),
        signal
      );
      if (data) {
        setBids(data);
        setLoading(false);
      }
    },
    [auctionId, dispatch]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchBids(signal);
    return () => controller.abort();
  }, [bidPrice, auctionId, fetchBids]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Fetching all bids...</p>
      </div>
    );
  }
  if (!bids.length) {
    return (
      <div className="container text-center mt-5">
        <i className="bi bi-emoji-frown fs-1 text-muted"></i>
        <h5 className="mt-3">No bids available</h5>
        <p className="text-muted">Be the first one to place a bid!</p>
      </div>
    );
  }
  return (
    <div className="container ">
      <div className="list-group overflow-auto">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="list-group-item list-group-item-action shadow-sm mb-3 rounded"
          >
            <div className="col-md-8">
              <h3 className="mb-0">
                {" "}
                <FaUserCircle />
                {bid.bidderId?.name || "Unknown User"}
              </h3>
              <p className="mb-1">
                <strong>Bid Amount:</strong>{" "}
                <span className="text-success">{bid.amount} PKR</span>
              </p>
              <p className="text-muted mb-0">
                <small>
                  Bid placed on:{" "}
                  {new Date(bid.createdAt).toLocaleString("en-PK")}
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

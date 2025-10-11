"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ListofBidder() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { auctionId } = params;

  useEffect(() => {
    fetchBids();
  }, [auctionId]);
  const fetchBids = async () => {
    try {
      await fetch("/api/biding/" + auctionId).then((res) => {
        res.json().then((data) => {
          console.log(data);
          setBids(data.data || []);
        });
      });
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {bids
          .filter((bid) => auctionId == bid.auctionId._id)
          .map((bid) => (
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

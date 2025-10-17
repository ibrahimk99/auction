"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { safeFetch } from "./safeFetch";

export default function ListofBidder({ bidPrice }) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auctionId } = useParams();
  const dispatch = useDispatch();

  const fetchBids = useCallback(async () => {
    const data = await safeFetch(
      `/api/biding/${auctionId}`,
      dispatch,
      {},
      "bids-fetched"
    );
    if (data) setBids(data);
    setLoading(false);
  }, [auctionId, dispatch]);

  useEffect(() => {
    fetchBids();
  }, [bidPrice, auctionId, fetchBids]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {bids.map((bid, i) => (
        <div key={i}>
          <FaUserCircle /> {bid.name}: ${bid.amount}
        </div>
      ))}
    </div>
  );
}

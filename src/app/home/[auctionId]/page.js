"use client";
import { CldImage } from "next-cloudinary";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ListofBidder from "@/app/components/ListofBidder";
import { useDispatch } from "react-redux";
import { showToast } from "@/app/store/toastSlice";
import { safeFetch } from "@/app/utils/safeFetch";

const GetAuction = () => {
  const [aucDetail, setAucDetail] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const { auctionId } = useParams();
  const dispatch = useDispatch();

  const fetchAuction = useCallback(
    async (signal) => {
      const data = await safeFetch(
        `/api/auction/${auctionId}`,
        dispatch,
        {},
        "auction-fetched",
        signal
      );
      if (data) {
        setAucDetail(data[0]);
        setLoading(false);
      }
    },
    [auctionId, dispatch]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (auctionId) {
      fetchAuction(signal);
    }
    return () => controller.abort();
  }, [auctionId, fetchAuction]);

  if (loading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }
  const {
    title,
    description,
    images,
    startingPrice,
    currentPrice,
    startTime,
    endTime,
    status,
  } = aucDetail;

  const increaseBid = async () => {
    if (!session?.user?.id) {
      router.push("/user-auth");
      dispatch(
        showToast({
          id: "network-error",
          message: "You are not logged in",
          type: "warning",
        })
      );
      return;
    }

    if (!bidPrice || isNaN(bidPrice) || Number(bidPrice) <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    const bidAmount = Number(bidPrice);
    const updatedPrice = Number(currentPrice) + bidAmount;
    const bidRes = await safeFetch(
      `/api/biding`,
      dispatch,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auctionId,
          bidderId: session.user.id,
          amount: bidAmount,
        }),
      },
      "bid-placed",
      null
    );

    if (!bidRes) return;
    const updateResp = await safeFetch(
      `/api/auction/${auctionId}`,
      dispatch,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPrice: updatedPrice }),
      },
      "bid-update",
      null
    );
    if (!updateResp) return;
    setAucDetail((prev) => ({
      ...prev,
      currentPrice: updatedPrice,
    }));
    setBidPrice("");
  };
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center text-md-start mb-4">{title}</h2>
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0">
              <CldImage
                priority
                width="800"
                height="600"
                src={images}
                alt={title}
                style={{ width: "100%", height: "auto" }}
                className="img-fluid rounded-top"
              />
              <div className="card-body">
                <p className="text-muted">{description}</p>

                <div className="mt-3">
                  <h5 className="fw-bold mb-3">Auction Summary</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Starting Price:</strong> {startingPrice} PKR
                    </li>
                    <li className="list-group-item">
                      <strong>Current Price:</strong>{" "}
                      <span className="text-success">{currentPrice} PKR</span>
                    </li>
                    <li className="list-group-item">
                      <strong>Start Time:</strong>{" "}
                      {startTime
                        ? new Date(startTime).toLocaleString("en-PK")
                        : "N/A"}
                    </li>
                    <li className="list-group-item">
                      <strong>End Time:</strong>{" "}
                      {endTime
                        ? new Date(endTime).toLocaleString("en-PK")
                        : "N/A"}
                    </li>
                    <li className="list-group-item">
                      <strong>Status:</strong>{" "}
                      <span className="badge bg-info text-dark">{status}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder="Enter your bid amount"
                  />
                  <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                    <button
                      type="submit"
                      className="btn btn-success w-100 w-sm-auto"
                      onClick={increaseBid}
                    >
                      Place a Bid
                    </button>
                    <button className="btn btn-outline-secondary w-100 w-sm-auto">
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm  h-100">
              <div className="card-body">
                <ListofBidder bidPrice={bidPrice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAuction;

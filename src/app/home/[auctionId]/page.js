"use client";
import { CldImage } from "next-cloudinary";
import Header from "@/app/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const GetAuction = () => {
  const [aucDetail, setAucDetail] = useState();
  console.log(aucDetail);
  const params = useParams();
  const { auctionId } = params;

  useEffect(() => {
    async function fetchAuction() {
      let res = await fetch(`/api/auction/${auctionId}`);
      res = await res.json();
      setAucDetail(res.data);
    }
    if (auctionId) fetchAuction();
  }, [auctionId]);

  if (!aucDetail) {
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
  } = aucDetail[0];

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <CldImage
              width="500"
              height="400"
              src={images} // must be Cloudinary public_id
              alt={title}
              // gravity="auto"
              className="img-fluid rounded-shadow"
            />
          </div>

          {/* Right side - Details */}
          <div className="col-md-6">
            <h2 className="mb-3">{title}</h2>
            <p className="text-muted">{description}</p>

            {/* Summary */}
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h5 className="card-title">Auction Summary</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Starting Price:</strong> {startingPrice} PKR
                  </li>
                  <li className="list-group-item">
                    <strong>Current Price:</strong> {currentPrice} PKR
                  </li>

                  <li className="list-group-item">
                    <strong>Start Time:</strong>{" "}
                    {new Date(Number(startTime)).toLocaleString()}
                  </li>
                  <li className="list-group-item">
                    <strong>End Time:</strong>{" "}
                    {aucDetail.endTime
                      ? new Date(Number(endTime)).toLocaleString()
                      : "Not Provided"}
                  </li>
                  <li className="list-group-item">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-info text-dark">{status}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4">
              <button className="btn btn-success me-2">Place a Bid</button>
              <button className="btn btn-outline-secondary">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAuction;

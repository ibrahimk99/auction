"use client";
import { CldImage } from "next-cloudinary";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardAuction = () => {
  const [aucDetail, setAucDetail] = useState("");
  const router = useRouter();

  const params = useParams();
  const { aucId } = params;

  useEffect(() => {
    async function fetchAuctions() {
      let res = await fetch(`/api/auction/${aucId}`);
      res = await res.json();
      setAucDetail(res.data);
    }
    if (aucId) fetchAuctions();
  }, [aucId]);

  const delAuction = async (id) => {
    let res = await fetch("/api/auction/" + id, {
      method: "DELETE",
    });
    res = await res.json();
    if (res.success) {
      router.push("/dashboard");
    }
  };

  if (!aucDetail) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }
  let {
    title,
    description,
    images,
    startingPrice,
    currentPrice,
    startTime,
    endTime,
    status,
  } = aucDetail[0];

  new Date(endTime.toLocaleString("en-PK"));

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
                    <strong>Auction Start:</strong>{" "}
                    {startTime
                      ? new Date(startTime).toLocaleString("en-PK")
                      : "Not Provided"}
                  </li>

                  <li className="list-group-item">
                    <strong>Auction End:</strong>{" "}
                    {endTime
                      ? new Date(endTime).toLocaleString("en-PK")
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
              <button
                className="btn btn-info me-2"
                onClick={() => router.push(`/dashboard/${aucId}/edit`)}
              >
                Edit Auction
              </button>
              <button
                className="btn btn-danger"
                onClick={() => delAuction(aucId)}
              >
                Delete Auction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAuction;

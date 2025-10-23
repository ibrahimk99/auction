"use client";
import { CldImage } from "next-cloudinary";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/app/store/toastSlice";
import { safeFetch } from "@/app/utils/safeFetch";

const DashboardAuction = () => {
  const [aucDetail, setAucDetail] = useState("");
  const router = useRouter();
  const params = useParams();
  const { aucId } = params;
  const dispatch = useDispatch();

  const fetchAucDetail = useCallback(
    async (signal) => {
      const data = await safeFetch(
        `/api/auction/${aucId}`,
        null,
        {},
        null,
        signal
      );
      if (data) {
        setAucDetail(data);
      }
    },
    [aucId]
  );
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (aucId) {
      fetchAucDetail(signal);
    }
    return () => controller.abort();
  }, [aucId, fetchAucDetail]);

  const delAuction = async (id) => {
    const data = await safeFetch(
      `/api/auction/${id}`,
      dispatch,
      {
        method: "DELETE",
      },
      Date.now(),
      null
    );
    if (data) {
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

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <CldImage
              width="500"
              height="400"
              src={images}
              alt={title}
              style={{ width: "100%", height: "auto" }}
              priority
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

"use client";
import { CldImage } from "next-cloudinary";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/app/store/toastSlice";

const DashboardAuction = () => {
  const [aucDetail, setAucDetail] = useState("");
  const router = useRouter();
  const params = useParams();
  const { aucId } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      async function fetchAuctions() {
        const response = await fetch(`/api/auction/${aucId}`, { signal });
        const result = await response.json();
        setAucDetail(result.data);
      }
      if (aucId) {
        fetchAuctions();
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      dispatch(
        showToast({
          id: "network-error",
          message: "Network Error! Please try again later.",
          type: "warning",
        })
      );
      console.error("Fetch error:", error);
    }
    return () => controller.abort();
  }, [aucId]);

  const delAuction = async (id) => {
    try {
      const response = await fetch("/api/auction/" + id, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok && result.success) {
        router.push("/dashboard");
        dispatch(
          showToast({
            id: "auction-delete",
            message: result.message,
            type: "success",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          id: "network-error",
          message: "Network Error Please Try Again Later",
          type: "warning",
        })
      );
      console.error("Fetch error:", error);
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
              src={images} // must be Cloudinary public_id
              alt={title}
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

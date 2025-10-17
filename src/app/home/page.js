"use client";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { safeFetch } from "../utils/safeFetch";
import { CldImage } from "next-cloudinary";

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const router = useRouter();

  const fetchAuctions = useCallback(async (signal) => {
    const data = await safeFetch("/api/auction", null, {}, null, signal);
    if (data) {
      setAuctions(data);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAuctions(signal);
    return () => controller.abort();
  }, [fetchAuctions]);

  return (
    <div>
      <Header />
      {auctions && auctions.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            {auctions.map((auction, idx) => (
              <div
                onClick={() => router.push("/home/" + auction._id)}
                key={idx}
                className="col-lg-3 col-md-6 col-sm-8 col-12 mb-4"
              >
                <div className="card h-100 shadow-sm">
                  <CldImage
                    src={auction.images}
                    width={400}
                    height={250}
                    crop="fill"
                    gravity="auto"
                    alt={auction.title}
                    className="card-img-top rounded-2xl w-full h-auto"
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{auction.title}</h5>
                    <p className="card-text text-muted">
                      {auction.description}
                    </p>
                    <p className="fw-semibold text-primary">
                      💰 {auction.startingPrice} PKR
                    </p>
                    <p className="fw-semibold text-success">
                      💰 {auction.currentPrice} PKR
                    </p>
                    <p className="text-secondary small mb-1">
                      ⏰ Start:{" "}
                      {new Date(auction.startTime).toLocaleString("en-PK")}
                    </p>
                    <p className="text-secondary small">
                      ⏳ End:{" "}
                      {new Date(auction.endTime).toLocaleString("en-PK")}
                    </p>
                    <span
                      className={`badge mt-2 ${
                        auction.status === "active" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {auction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="text-center mt-5">No Auction Available</h3>
      )}
    </div>
  );
}

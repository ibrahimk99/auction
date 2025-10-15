"use client";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch("/api/auction", { signal });
      const result = await response.json();
      if (response.ok && result.success) {
        setAuctions(result.data);
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "Network Error Please Try Again Later",
          type: "warning",
        })
      );
    }

    return () => controller.abort();
  };

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
                  <Image
                    src={auction.images}
                    className="card-img-top"
                    alt={auction.title}
                    width={100}
                    height={200}
                    objectFit="cover"
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

// app/page.js (or pages/index.js if using Pages Router)

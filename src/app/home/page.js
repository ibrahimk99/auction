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
    let res = await fetch("/api/auction");
    res = await res.json();
    console.log(res.data);
    setAuctions(res.data);
  };
  const getAuction = (id) => {
    router.push("/home/" + id);
  };

  return (
    <div>
      <Header />
      {auctions && auctions.length > 0 ? (
        <div className="container mt-4">
          <div className="row">
            {auctions.map((auction, idx) => (
              <div
                onClick={() => getAuction(auction._id)}
                key={idx}
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
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
                      {new Date(Number(auction.startTime)).toLocaleString()}
                    </p>
                    <p className="text-secondary small">
                      ⏳ End:{" "}
                      {new Date(Number(auction.endTime)).toLocaleString()}
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

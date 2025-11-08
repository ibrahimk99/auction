"use client";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { safeFetch } from "../utils/safeFetch";

export default function Dashboard() {
  const { data: session } = useSession();
  const [auctions, setAuctions] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchAuctions = useCallback(
    async (signal) => {
      const data = await safeFetch("/api/dashboard", null, {}, null, signal);
      if (data) {
        setAuctions(data);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAuctions(signal);
    return () => controller.abort();
  }, [fetchAuctions, session]);

  if (!session) {
    return (
      <p className="text-center mt-5">
        Please login first <Link href="/user-auth">Log in Here</Link>
      </p>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mt-4">
        {/* Greeting Section */}
        <h2 className="mb-4 text-center">
          Welcome <span className="text-primary">{session.user.name}</span>,
          Role: <span className="badge bg-info">{session.user.role}</span>
        </h2>

        {/* Auctions Grid */}
        {auctions.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {auctions.map((auction, idx) => (
              <div
                key={idx + 1}
                className="card shadow-sm flex-grow-1"
                style={{
                  maxWidth: "300px",
                  minWidth: "260px",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/dashboard/" + auction._id)}
              >
                <Image
                  src={auction.images}
                  className="card-img-top"
                  alt={auction.title}
                  width={300}
                  height={200}
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                  priority
                />

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-center">{auction.title}</h5>
                    <p className="card-text text-muted small">
                      {auction.description}
                    </p>

                    <p className="mb-1">
                      <span className="fw-bold">💰 Starting:</span>{" "}
                      {auction.startingPrice} PKR
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">💰 Current:</span>{" "}
                      {auction.currentPrice} PKR
                    </p>

                    <p className="mb-1 small">
                      ⏰ <span className="fw-bold">Start:</span>{" "}
                      {new Date(auction.startTime).toLocaleString()}
                    </p>
                    <p className="mb-2 small">
                      ⏳ <span className="fw-bold">End:</span>{" "}
                      {new Date(auction.endTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center mt-3">
                    <span
                      className={`badge ${
                        auction.status === "active"
                          ? "bg-success"
                          : auction.status === "upcoming"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {auction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4 className="text-center text-muted mt-5">No Auction Available</h4>
        )}
      </div>
    </div>
  );
}

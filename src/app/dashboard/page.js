"use client";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

export default function Dashboard() {
  const { data: session } = useSession();
  const [auctions, setAuctions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchAuctions = useCallback(
    async (signal) => {
      try {
        const response = await fetch("/api/dashboard", { signal });
        const result = await response.json();
        if (response.ok && result.success) {
          setAuctions(result.data);
          if (!fetched) {
            dispatch(
              showToast({
                id: "auction-fetched",
                message: result.message,
                type: "success",
              })
            );
          }
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
    },
    [fetched, dispatch]
  );
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (session) {
      fetchAuctions(signal);
    }
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
        <h2 className="mb-4">
          Welcome <span className="text-primary">{session.user.name}</span>,
          Role: <span className="badge bg-info">{session.user.role}</span>
        </h2>

        {auctions.length > 0 ? (
          <div className="row">
            {auctions.map((auction, idx) => (
              <div
                className="col-lg-3 col-md-6 col-sm-8 col-12 mb-4"
                key={idx + 1}
              >
                <div
                  className="card shadow-sm h-100"
                  onClick={() => router.push("/dashboard/" + auction._id)}
                >
                  <Image
                    src={auction.images}
                    className="card-img-top"
                    alt={auction.title}
                    width={200}
                    height={200}
                    priority
                    objectFit="cover"
                  />

                  <div className="card-body">
                    <h5 className="card-title">{auction.title}</h5>
                    <p className="card-text text-muted">
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

                    <p className="mb-1">
                      ⏰ <span className="fw-bold">Start:</span>{" "}
                      {new Date(auction.startTime).toLocaleString()}
                    </p>
                    <p className="mb-2">
                      ⏳ <span className="fw-bold">End:</span>{" "}
                      {new Date(auction.endTime).toLocaleString()}
                    </p>
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

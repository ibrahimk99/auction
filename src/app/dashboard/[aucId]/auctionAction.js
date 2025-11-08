"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { safeFetch } from "@/app/utils/safeFetch";
import { showToast } from "@/app/store/toastSlice";

export default function AuctionActions({ aucId }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const delAuction = async () => {
    const data = await safeFetch(
      `/api/auction/${aucId}`,
      dispatch,
      { method: "DELETE" },
      Date.now(),
      null
    );
    if (data) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="mt-4">
      <button
        className="btn btn-info me-2"
        onClick={() => router.push(`/dashboard/${aucId}/edit`)}
      >
        Edit Auction
      </button>
      <button className="btn btn-danger" onClick={delAuction}>
        Delete Auction
      </button>
    </div>
  );
}

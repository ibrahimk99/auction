"use client";
import { useDispatch } from "react-redux";
import { showToast } from "@/app/store/toastSlice";

export default function ExampleButton() {
  const dispatch = useDispatch();

  return (
    <div className="p-3">
      <button
        className="btn btn-success me-2"
        onClick={() =>
          dispatch(showToast({ message: "Success!", type: "success" }))
        }
      >
        Show Success
      </button>
      <button
        className="btn btn-danger me-2"
        onClick={() =>
          dispatch(showToast({ message: "Error occurred!", type: "error" }))
        }
      >
        Show Error
      </button>
      <button
        className="btn btn-warning me-2"
        onClick={() =>
          dispatch(showToast({ message: "Be careful!", type: "warning" }))
        }
      >
        Show Warning
      </button>
      <button
        className="btn btn-secondary"
        onClick={() =>
          dispatch(showToast({ message: "Hello from Redux!", type: "info" }))
        }
      >
        Show Info
      </button>
    </div>
  );
}

"use client";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "@/app/store/toastSlice";
import { useEffect } from "react";

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast);

  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((t) =>
        setTimeout(() => dispatch(hideToast(t.id)), 3000)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [toasts, dispatch]);

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast align-items-center text-bg-${toast.type} border-0 show mb-2`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ minWidth: "250px" }}
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => dispatch(hideToast(toast.id))}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

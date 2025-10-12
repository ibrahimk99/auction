"use client";
import { useEffect, useState } from "react";

const Toast = ({ message, status = "success", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`toast align-items-center text-bg-${status} border-0 show position-fixed bottom-0 end-0 m-3`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        zIndex: 9999,
        minWidth: "250px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="d-flex">
        <div className="toast-body fw-semibold">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={() => setVisible(false)}
        ></button>
      </div>
    </div>
  );
};

export default Toast;

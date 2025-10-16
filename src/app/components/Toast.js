"use client";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { hideToast } from "@/app/store/toastSlice";

export default function Toast() {
  const toasts = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const shownToasts = useRef(new Set());

  useEffect(() => {
    if (toasts.length === 0) return;
    toasts.forEach((t) => {
      if (shownToasts.current.has(t.id)) return;
      if (t.type === "success") toast.success(t.message);
      else if (t.type === "error") toast.error(t.message);
      else if (t.type === "warning") toast.warning(t.message);
      else toast(t.message);
      shownToasts.current.add(t.id);
      setTimeout(() => dispatch(hideToast(t.id)), 3000);
    });
  }, [toasts, dispatch]);

  return null;
}

"use client";
import Link from "next/link";
import { notFound } from "next/navigation";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light">
      <h1 className="display-3 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href="./home">Go Home</Link>
    </div>
  );
};
export default NotFound;

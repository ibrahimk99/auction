"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold" href="/home">
          Auction App
        </Link>

        {/* Navbar toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/createauction">
                Create Auction
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Footer;

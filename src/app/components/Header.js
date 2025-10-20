"use client";
import { useDispatch } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { loginPageAction } from "../store/loginPageSlice";

const Header = () => {
  const handleLoginPage = (value) => {
    dispatch(loginPageAction.setLogin(value));
  };

  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut();
    router.replace("/home");
    dispatch({
      type: "toast/showToast",
      payload: {
        id: "logout-success",
        message: "Logout Successfully",
        type: "success",
      },
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold" href="/">
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
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/watchlist">
                WatchList
              </Link>
            </li>
          </ul>
          {/* Right Side: Auth Links */}
          <ul className="navbar-nav">
            {session ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" href="/dashboard">
                    <FaUserCircle className="mb-1 me-1" />
                    {session.user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item" onClick={() => handleLoginPage(true)}>
                  <Link className="nav-link" href="/user-auth">
                    Login
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleLoginPage(false)}>
                  <Link className="nav-link" href="/user-auth">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

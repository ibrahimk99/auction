"use client";
import Header from "./components/Header";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex flex-column">
      <Header />
      <section className="flex-grow-1 d-flex align-items-center justify-content-center bg-hero text-center text-light p-4">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3 text-glow">
            Welcome to <span className="text-warning">Auction Aura</span>
          </h1>
          <h2 className="mb-4">
            Created with ❤️ by <span className="text-info">Ibrahim Khan</span>
          </h2>
          <p className="lead mb-5 text-secondary">
            Discover, bid, and win exclusive treasures in real-time auctions.
          </p>
          <Link href="/home" className="btn btn-warning btn-lg px-5 shadow-lg">
            Start Bidding
          </Link>
        </div>
      </section>
      <footer className="bg-black text-center text-secondary py-3 mt-auto border-top border-secondary">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Auction Aura. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

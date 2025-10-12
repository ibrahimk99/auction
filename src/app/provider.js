"use client";
import { Provider } from "react-redux";
import auctionStore from "./store";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <SessionProvider>
      {" "}
      <Provider store={auctionStore}>{children}</Provider>
    </SessionProvider>
  );
}

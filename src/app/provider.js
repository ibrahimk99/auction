"use client";
import { Provider } from "react-redux";
import auctionStore from "./store";
import Toast from "./components/Toast";
import { SessionProvider } from "next-auth/react";
export function Providers({ children }) {
  return (
    <Provider store={auctionStore}>
      <SessionProvider> {children}</SessionProvider>
      <Toast />
    </Provider>
  );
}

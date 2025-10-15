"use client";

import { Provider } from "react-redux";
import auctionStore from "./store";
import { SessionProvider } from "next-auth/react";
import Toast from "./components/Toast";
import { Toaster } from "sonner";

export function Providers({ children }) {
  return (
    <Provider store={auctionStore}>
      <SessionProvider>
        <Toast />
        <Toaster
          position="top-right"
          richColors
          closeButton
          pauseOnHover
          reverseOrder={true}
        />

        {children}
      </SessionProvider>
    </Provider>
  );
}

"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster position="bottom-right" />
      {children}
    </Provider>
  );
}


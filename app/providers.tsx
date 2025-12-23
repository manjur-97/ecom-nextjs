"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import { initializeCart } from "../features/cart/cartSlice";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize cart from localStorage on app load
    store.dispatch(initializeCart());
  }, []);

  return (
    <Provider store={store}>
      <Toaster position="bottom-right" />
      {children}
    </Provider>
  );
}


"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";

import { initializeCart } from "../features/cart/cartSlice";
import { setOrders } from "../features/orders/ordersSlice";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize cart from localStorage on app load
    store.dispatch(initializeCart());
    // Initialize orders from localStorage on app load
    if (typeof window !== "undefined") {
      const orders = localStorage.getItem("orders");
      if (orders) {
        store.dispatch(setOrders(JSON.parse(orders)));
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Toaster position="bottom-right" />
      {children}
    </Provider>
  );
}


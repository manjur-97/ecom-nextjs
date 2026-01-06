// "use client";
// import { ReactNode, useEffect } from "react";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";
// import { Toaster } from "react-hot-toast";

// import { initializeCart } from "../features/cart/cartSlice";
// import { setOrders } from "../features/orders/ordersSlice";

// export default function Providers({ children }: { children: ReactNode }) {
//   useEffect(() => {
//     // Initialize cart from localStorage on app load
//     store.dispatch(initializeCart());
//     // Initialize orders from localStorage on app load
//     if (typeof window !== "undefined") {
//       const orders = localStorage.getItem("orders");
//       if (orders) {
//         store.dispatch(setOrders(JSON.parse(orders)));
//       }
//     }
//   }, []);

//   return (
//     <Provider store={store}>
//       <Toaster position="bottom-right" />
//       {children}
//     </Provider>
//   );
// }

"use client";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "../redux/store";
import { Toaster } from "react-hot-toast";

import { initializeCart } from "../features/cart/cartSlice";
import { setOrders } from "../features/orders/ordersSlice";
import { fetchCurrentUser } from "../features/user/userSlice";

// Auth Initializer Component
function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Check current user authentication
        await dispatch(fetchCurrentUser()).unwrap();
        console.log('✅ User authenticated');
      } catch (error) {
        // User not authenticated - silent fail
        console.log(error);
        console.log('ℹ️ User not authenticated');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [dispatch]);

  // Show loading during initial auth check
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Main Providers Component
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
      <AuthInitializer>
        <Toaster position="bottom-right" />
        {children}
      </AuthInitializer>
    </Provider>
  );
}
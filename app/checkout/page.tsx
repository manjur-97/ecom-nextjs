"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quickCheckoutItem, setQuickCheckoutItem] = useState<any>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Check if coming from quick buy modal
    const quickData = sessionStorage.getItem("quickCheckout");
    if (quickData) {
      setQuickCheckoutItem(JSON.parse(quickData));
      sessionStorage.removeItem("quickCheckout");
    }
  }, []);

  const items = quickCheckoutItem ? [quickCheckoutItem] : cartItems;

  const total = items.reduce(
    (sum, item) => sum + (item.offerPrice || item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-green-900 mb-2">Order Placed!</h1>
          <p className="text-green-700 mb-8">
            Your order has been confirmed. Redirecting to home...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Delivery Address
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="John Doe"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="john@example.com"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="+1 234 567 8900"
                />
                <textarea
                  placeholder="Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  defaultValue="123 Main Street, New York, NY 10001"
                />
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" defaultChecked />
                  <span className="ml-3 font-semibold text-gray-800">
                    Credit/Debit Card
                  </span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" />
                  <span className="ml-3 font-semibold text-gray-800">
                    Digital Wallet
                  </span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" />
                  <span className="ml-3 font-semibold text-gray-800">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition shadow-md mb-3"
              >
                Place Order
              </button>

              <Link
                href="/cart"
                className="block text-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

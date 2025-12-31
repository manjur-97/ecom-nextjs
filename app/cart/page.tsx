"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity, clearCart } from "../../features/cart/cartSlice";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.offerPrice || item.price) * item.quantity,
    0
  );

  const regularTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const savings = regularTotal - total;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Start shopping and add items to your cart!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-500 "
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded shadow  overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const itemPrice = item.offerPrice || item.price;
                  const discount = item.offerPrice
                    ? Math.round(
                        ((item.price - item.offerPrice) / item.price) * 100
                      )
                    : 0;

                  return (
                    <div
                      key={item.id}
                      className="p-6 flex gap-4 hover:bg-gray-50 transition"
                    >
                      {/* Product Image */}
                      <div className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-contain bg-gray-100 rounded-lg p-2"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-gray-800 mb-1">
                          {item.name}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-700">
                            ৳{itemPrice.toFixed(2)}
                          </span>
                          {item.offerPrice && (
                            <>
                              <span className="text-lg text-gray-400 line-through">
                                ৳{item.price}
                              </span>
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                                {discount}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Size Info */}
                        {item.selectedSize && (
                          <div className="text-sm text-gray-600 mb-3">
                            Size/Storage: <span className="font-semibold">{item.selectedSize}</span>
                          </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: Math.max(1, item.quantity - 1),
                                  })
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 transition"
                          >
                            <Trash2 size={18} />
                            
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-2">Total</div>
                        <div className="text-xl font-bold text-gray-700">
                          ৳{(itemPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="font-semibold">৳{regularTotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>You Save</span>
                    <span>৳{savings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                <span>৳{total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-linear-to-r from-gray-500 to-gray-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 rounded transition shadow mb-3"
              >
                Checkout ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


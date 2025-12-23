"use client";
import { useState } from "react";
import { Product } from "../../features/products/productsSlice";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type Props = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

export default function BuyModal({ product, isOpen, onClose }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  if (!isOpen) return null;

  const handleCheckout = () => {
    // Store selected product data in session/localStorage for checkout
    const cartItem = {
      ...product,
      quantity,
      selectedSize,
    };
    sessionStorage.setItem("quickCheckout", JSON.stringify(cartItem));
    router.push("/checkout");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Quick Buy</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Product Preview */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain mb-3"
            />
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{product.description}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-bold text-white">
                ${product.offerPrice || product.price}
              </span>
              {product.offerPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Discount Badge */}
            {product.offerPrice && (
              <div className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mb-3">
                {Math.round(
                  ((product.price - product.offerPrice) / product.price) * 100
                )}
                % OFF
              </div>
            )}
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">
                Size / Storage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-2 rounded border-2 font-semibold transition ${
                      selectedSize === size
                        ? "border-pink-500 bg-pink-500/10 text-pink-400"
                        : "border-gray-600 text-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">
              Quantity
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-white hover:bg-gray-800"
              >
                −
              </button>
              <span className="px-6 py-2 text-white font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-white hover:bg-gray-800"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-2xl font-bold">
                ${((product.offerPrice || product.price) * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Continue to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold py-3 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

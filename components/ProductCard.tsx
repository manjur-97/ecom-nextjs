"use client";
import { Product } from "../features/products/productsSlice";
import { useAppDispatch } from "../redux/store";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-2" />
      <h2 className="text-lg font-bold mb-1">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <span className="text-xl font-semibold mb-2">${product.price}</span>
      <button
        className="bg-blue-600 text-white rounded px-4 py-2 mt-auto"
        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
      >
        Add to Cart
      </button>
    </div>
  );
}


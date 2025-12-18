"use client";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { RootState } from "../redux/store";

export default function Home() {
  const products = useSelector((state: RootState) => state.products.items);
  return (
    <main className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}


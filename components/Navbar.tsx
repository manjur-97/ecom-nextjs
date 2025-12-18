"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Navbar() {
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((a, b) => a + b.quantity, 0));
  const username = useSelector((state: RootState) => state.user.username);
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md mb-10">
      <Link href="/"> <span className="font-bold text-2xl">Ecommarce</span> </Link>
      <div className="flex items-center gap-6">
        <Link href="/cart">Cart <span className="bg-black text-white px-2 rounded">{cartCount}</span></Link>
        {username ? (
          <span>Welcome, {username}!</span>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}


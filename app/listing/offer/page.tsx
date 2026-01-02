"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState } from "../../../redux/store";
import CampaignCard from "@/components/ui/CampaignCard";



export default function ListingPage() {
  const products = useSelector((state: RootState) => state.products.items);
  const searchParams = useSearchParams();
  const offerCategory = searchParams.get("offerCategory") || "All Offers";
  // alert(searchQuery);


  return (
    <div className="container mx-auto flex gap-6 px-3 py-3 min-h-screen">

      {/* Main Content */}
      <main className="flex-1 bg-white rounded shadow p-6">
        {/* Breadcrumbs and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <nav className="text-sm text-gray-400 flex items-center gap-1">
              <span>Home</span>
              <span className="mx-1">/</span>
              <span className="text-black font-medium">Products</span>
              <span className="mx-1">/</span>
              <span className="text-black font-medium">Offers</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-800">{offerCategory} </h1>
          </div>

        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-16 text-lg">No products found.</div>
          )}
          {products.map(product => (
            <CampaignCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

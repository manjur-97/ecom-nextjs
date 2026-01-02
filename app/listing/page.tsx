"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ui/ProductCard";
import { RootState } from "../../redux/store";

const CATEGORY_DATA = [
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    name: "Electronics",
    subcategories: ["Mobiles", "Smart Watch", "Headphones", "Camera"],
  },
  {
    name: "Home Decor",
    subcategories: ["Furniture", "Lighting", "Bedding"],
  },
  {
    name: "Toys",
    subcategories: ["Educational", "Outdoor", "Board Games"],
  },
];
const SIZES = ["one-size", "S", "M", "L", "XL", "XS"];
const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#A66CFF", "#FFB4B4", "#22223B", "#F7B801"];

export default function ListingPage() {
  const products = useSelector((state: RootState) => state.products.items);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    let pass = true;

    // Search query filter - any word matching
    if (searchQuery.trim()) {
      const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
      const productName = p.name?.toLowerCase() || "";
      const productDescription = p.description?.toLowerCase() || "";
      
      // Check if ANY word from search query matches product name or description
      const hasMatch = queryWords.some(word => 
        productName.includes(word) || productDescription.includes(word)
      );
      
      pass = pass && hasMatch;
    }

    // Category filter
    if (selectedSubcategories.length > 0) {
      pass = pass && selectedSubcategories.some(sub => p.name.toLowerCase().includes(sub.toLowerCase()));
    }
    
    // Size filter
    if (selectedSizes.length > 0 && p.sizes) {
      pass = pass && selectedSizes.some(size => p.sizes?.includes(size));
    }
    
    // Color filter
    if (selectedColors.length > 0) {
      // No color in product data, skip for now
      pass = pass;
    }
    
    // Rating filter
    if (selectedRating) {
      pass = pass && (p.rating || 0) >= selectedRating;
    }
    
    return pass;
  });

  return (
    <div className="container mx-auto flex gap-3 px-3 py-3 min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-72 bg-white rounded shadow p-6 hidden lg:block sticky top-8 h-fit self-start">
        {/* Category & Subcategory */}
        <div className="mb-8">
          <h3 className="font-bold mb-3 text-lg">Category</h3>
          {CATEGORY_DATA.map((cat) => (
            <div key={cat.name} className="mb-2">
              <label className="flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={e => {
                    setSelectedCategories(val =>
                      e.target.checked
                        ? [...val, cat.name]
                        : val.filter(c => c !== cat.name)
                    );
                  }}
                  className="accent-primary"
                />
                {cat.name}
              </label>
              <div className="pl-6 mt-1 flex flex-col gap-1">
                {cat.subcategories.map(sub => (
                  <label key={sub} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub)}
                      onChange={e => {
                        setSelectedSubcategories(val =>
                          e.target.checked
                            ? [...val, sub]
                            : val.filter(s => s !== sub)
                        );
                      }}
                      className="accent-primary"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Size */}
        <div className="mb-8">
          <h3 className="font-bold mb-3 text-lg">Size</h3>
          <div className="flex flex-wrap gap-2">
            {SIZES.map(size => (
              <label key={size} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={e => {
                    setSelectedSizes(val =>
                      e.target.checked
                        ? [...val, size]
                        : val.filter(s => s !== size)
                    );
                  }}
                  className="accent-primary"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        {/* Color */}
        <div className="mb-8">
          <h3 className="font-bold mb-3 text-lg">Color</h3>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <label key={color} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={e => {
                    setSelectedColors(val =>
                      e.target.checked
                        ? [...val, color]
                        : val.filter(c => c !== color)
                    );
                  }}
                  className="accent-primary"
                />
                <span className="w-5 h-5 rounded-full border" style={{ background: color }}></span>
              </label>
            ))}
          </div>
        </div>
        {/* Rating */}
        <div className="mb-4">
          <h3 className="font-bold mb-3 text-lg">Rating</h3>
          <div className="flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map(r => (
              <label key={r} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === r}
                  onChange={() => setSelectedRating(r)}
                  className="accent-primary"
                />
                {Array.from({ length: r }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                &amp; up
              </label>
            ))}
            <button className="text-xs text-gray-500 underline mt-1 text-left" onClick={() => setSelectedRating(null)}>Clear</button>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-white rounded shadow p-6">
        {/* Breadcrumbs and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <nav className="text-sm text-gray-400 flex items-center gap-1">
              <span>Home</span>
              <span className="mx-1">/</span>
              <span className="text-black font-medium">Products</span>
            </nav>
            {searchQuery && (
              <div className="text-sm text-gray-600">
                Search results for: <span className="font-semibold text-gray-900">"{searchQuery}"</span>
                <span className="ml-2 text-gray-500">({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})</span>
              </div>
            )}
          </div>
          <div>
            <label className="mr-2 text-sm font-medium">Sort By</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-16 text-lg">No products found.</div>
          )}
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { color } from "./theme/Color";


function Category() {
  const router = useRouter();
  const categories = [
  {
    id: 1,
    name: "Men",
    icon: "👔",
    hasDropdown: true,
    subcategories: [
      { id: 101, name: "T-Shirts", icon: "👕" },
      { id: 102, name: "Shirts", icon: "👔" },
      { id: 103, name: "Panjabi & Kurta", icon: "🧥" },
      { id: 104, name: "Jeans & Trousers", icon: "👖" },
      { id: 105, name: "Jackets & Hoodies", icon: "🧥" },
      { id: 106, name: "Innerwear", icon: "🩲" },
    ],
  },
  {
    id: 2,
    name: "Women",
    icon: "👗",
    hasDropdown: true,
    subcategories: [
      { id: 201, name: "Tops & T-Shirts", icon: "👚" },
      { id: 202, name: "Dresses", icon: "👗" },
      { id: 203, name: "Saree", icon: "🥻" },
      { id: 204, name: "Kurtis", icon: "👘" },
      { id: 205, name: "Jeans & Skirts", icon: "👖" },
      { id: 206, name: "Lingerie", icon: "🩱" },
    ],
  },
  {
    id: 3,
    name: "Kids",
    icon: "🧒",
    hasDropdown: true,
    subcategories: [
      { id: 301, name: "Boys Clothing", icon: "🧒" },
      { id: 302, name: "Girls Clothing", icon: "👧" },
      { id: 303, name: "Baby Wear", icon: "👶" },
      { id: 304, name: "School Wear", icon: "🎒" },
    ],
  },
  {
    id: 4,
    name: "Footwear",
    icon: "👟",
    hasDropdown: true,
    subcategories: [
      { id: 401, name: "Men Shoes", icon: "👞" },
      { id: 402, name: "Women Shoes", icon: "👠" },
      { id: 403, name: "Sneakers", icon: "👟" },
      { id: 404, name: "Sandals & Slippers", icon: "🩴" },
    ],
  },
  {
    id: 5,
    name: "Bags",
    icon: "👜",
    hasDropdown: true,
    subcategories: [
      { id: 501, name: "Backpacks", icon: "🎒" },
      { id: 502, name: "Handbags", icon: "👜" },
      { id: 503, name: "Sling Bags", icon: "👝" },
      { id: 504, name: "Travel Bags", icon: "🧳" },
      { id: 505, name: "Wallets", icon: "👛" },
    ],
  },
  {
    id: 6,
    name: "Accessories",
    icon: "🕶️",
    hasDropdown: true,
    subcategories: [
      { id: 601, name: "Belts", icon: "🧢" },
      { id: 602, name: "Caps & Hats", icon: "🎩" },
      { id: 603, name: "Sunglasses", icon: "🕶️" },
      { id: 604, name: "Scarves", icon: "🧣" },
    ],
  },
  {
    id: 7,
    name: "Beauty",
    icon: "💄",
    hasDropdown: true,
    subcategories: [
      { id: 701, name: "Makeup", icon: "💄" },
      { id: 702, name: "Skincare", icon: "🧴" },
      { id: 703, name: "Hair Care", icon: "💇" },
      { id: 704, name: "Fragrances", icon: "🌸" },
    ],
  },
  {
    id: 8,
    name: "Living",
    icon: "🏠",
    hasDropdown: true,
    subcategories: [
      { id: 801, name: "Home Decor", icon: "🖼️" },
      { id: 802, name: "Furnishings", icon: "🛋️" },
      { id: 803, name: "Kitchen & Dining", icon: "🍽️" },
      { id: 804, name: "Bedding & Bath", icon: "🛏️" },
    ],
  },
  {
    id: 9,
    name: "Watches",
    icon: "⌚",
    hasDropdown: true,
    subcategories: [
      { id: 901, name: "Men Watches", icon: "⌚" },
      { id: 902, name: "Women Watches", icon: "⌚" },
      { id: 903, name: "Smart Watches", icon: "⌚" },
      { id: 904, name: "Jewelry", icon: "💍" },
    ],
  },
  {
    id: 10,
    name: "Gifts",
    icon: "🎁",
    hasDropdown: false,
    subcategories: [],
  },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  // Store dropdown position for each category
  const [dropdownPosMap, setDropdownPosMap] = useState<Record<number, { left: number; top: number }>>({});

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-350 mx-auto px-4 py-3">
        <div className="relative flex items-center lg:justify-center">
          {/* Left Arrow - Mobile Only */}
          <button
            onClick={() => scroll("left")}
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} className="text-gray-700" />
          </button>

          {/* Scrollable Category Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide md:px-0 px-6"
          >
            {categories.map((category) => {
              const catRef = useRef<HTMLDivElement>(null);
              return (
                <div
                  key={category.id}
                  className="flex flex-col items-center gap-2 cursor-pointer group shrink-0 transition-all duration-200 relative"
                  ref={catRef}
                  onMouseEnter={e => {
                    setOpenDropdown(category.id);
                    // Position dropdown under hovered category
                    const rect = catRef.current?.getBoundingClientRect();
                    if (rect) {
                      setDropdownPosMap(pos => ({ ...pos, [category.id]: {
                        left: rect.left + rect.width / 2,
                        top: rect.bottom + window.scrollY,
                      }}));
                    }
                  }}
                  onMouseLeave={e => {
                    // Only close if not hovering dropdown
                    const related = e.relatedTarget as HTMLElement | null;
                    if (!related || !related.closest('.category-dropdown')) setOpenDropdown(null);
                  }}
                  onClick={() => {
                    if (!category.hasDropdown) {
                      router.push(`/listing?category=${encodeURIComponent(category.name)}`);
                    }
                  }}
                >
                {/* Category Icon/Image Container */}
                <div className="relative">
                  <div
                    className="w-20 h-20 bg-linear-to-br rounded-lg flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md group-hover:scale-95 transition-all duration-200"
                    style={{ background: color.gradient }}
                  >
                    {category.icon}
                  </div>
                  {/* Subcategory Dropdown */}
                  {category.hasDropdown && openDropdown === category.id && dropdownPosMap[category.id] && (
                    <div
                      className="fixed z-50 min-w-[220px] bg-white border border-gray-200 rounded shadow-lg animate-fade-in p-2 category-dropdown"
                      style={{
                        left: dropdownPosMap[category.id].left + 50,
                        top: dropdownPosMap[category.id].top + 0, // 8px gap below
                        transform: 'translateX(-50%)',
                      }}
                      onMouseEnter={() => setOpenDropdown(category.id)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {category.subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer whitespace-nowrap"
                          onClick={() => {
                            router.push(`/listing?subcategory=${encodeURIComponent(sub.name)}`);
                            setOpenDropdown(null);
                          }}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <div className="flex items-center gap-1 text-center">
                  <p className="text-sm font-medium transition-colors duration-200 max-w-20 line-clamp-2"
                    style={{ color: color.primary }}
                  >
                    {category.name}
                  </p>
                  {category.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-colors ${openDropdown === category.id ? 'rotate-180' : ''}`}
                      style={{ color: color.primary }}
                    />
                  )}
                </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow - Mobile Only */}
          <button
            onClick={() => scroll("right")}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Category;
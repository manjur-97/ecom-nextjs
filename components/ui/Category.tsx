"use client";
import React, { useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { color } from "./theme/Color";

const categories = [
  {
    id: 1,
    name: "Minutes",
    icon: "🎯",
    hasDropdown: false,
  },
  {
    id: 2,
    name: "Mobiles ",
    icon: "📱",

    hasDropdown: false,
  },
  {
    id: 3,
    name: "Fashion",
    icon: "👗",
    hasDropdown: false,
  },
  {
    id: 4,
    name: "Electronics",
    icon: "💻",

    hasDropdown: false,
  },
  {
    id: 5,
    name: "TVs ",
    icon: "📺",

    hasDropdown: false,
  },
  {
    id: 6,
    name: "Furniture",
    icon: "🪑",

    hasDropdown: false,
  },
  {
    id: 7,
    name: "Bookings",
    icon: "✈️",

    hasDropdown: false,
  },
  {
    id: 8,
    name: "Beauty",
    icon: "💄",

    hasDropdown: false,
  },
  {
    id: 9,
    name: "Grocery",
    icon: "🛒",

    hasDropdown: false,
  },
];

function Category() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-350 mx-auto px-4 py-6">
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
            className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide md:px-0 px-6"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center gap-2 cursor-pointer group shrink-0 transition-all duration-200"
              >
                {/* Category Icon/Image Container */}
                <div className="relative">
                  <div
                    className="w-20 h-20 bg-linear-to-br rounded-lg flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md group-hover:scale-95 transition-all duration-200"
                    style={{ background: color.gradient }}
                  >
                    {category.icon}
                  </div>
                </div>

                {/* Category Name */}
                <div className="flex items-center gap-1 text-center">
                  <p className="text-sm font-medium transition-colors duration-200 max-w-20 line-clamp-2"
                    style={{ color: color.primaryText }}
                  >
                    {category.name}
                  </p>
                  {category.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className="transition-colors"
                      style={{ color: color.primaryText }}
                    />
                  )}
                </div>
              </div>
            ))}
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
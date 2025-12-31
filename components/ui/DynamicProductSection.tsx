"use client";
import React, { useState, useEffect } from "react";
import { Clock, Heart } from "lucide-react";
import Link from "next/link";
import { color } from "./theme/Color";

export interface DynamicProductSectionProps {
  title: string;
  viewMoreLink?: string;
  products: Array<{
    id: string;
    image: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    badge?: string;
    badgeColor?: string;
    expiresAt?: Date | string; // For countdown timer
    rating?: number;
  }>;
  columns?: number; // Number of columns per row (2, 3, 4, 6 etc)
  gap?: string; // Tailwind gap class (default: "gap-4")
}

// Countdown Timer Component
function CountdownTimer({ expiresAt }: { expiresAt?: Date | string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
  });

  useEffect(() => {
    if (!expiresAt) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(expiresAt).getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  if (!expiresAt) return null;

  return (
    <div className="flex gap-1 text-xs font-bold bg-white/60 text-white py-1 px-2 rounded justify-center items-center" >
      <Clock className="w-3.5 h-3.5 " style={{color:color.primary}}/>
      <span className="px-1.5 py-1.2 rounded text-sm" style={{ background: color.primary, color: color.primaryText }}>{String(timeLeft.days).padStart(2, "0")}d</span>
      <span className="px-1.5 py-1.2 rounded text-sm" style={{ background: color.primary, color: color.primaryText }}>{String(timeLeft.hours).padStart(2, "0")}h</span>
      <span className="px-1.5 py-1.2 rounded text-sm" style={{ background: color.primary, color: color.primaryText }}>{String(timeLeft.minutes).padStart(2, "0")}m</span>
      <span className="px-1.5 py-1.2 rounded text-sm" style={{ background: color.primary, color: color.primaryText }}>{String(timeLeft.seconds).padStart(2, "0")}s</span>
    </div>
  );
}

export default function DynamicProductSection({
  title,
  viewMoreLink = "#",
  products = [],
  columns = 4,
  gap = "gap-4",
}: DynamicProductSectionProps) {
  // Responsive grid columns
  const gridColsMap: Record<number, string> = {
    2: "grid-cols-2 md:grid-cols-2 lg:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gridClass = gridColsMap[columns] || gridColsMap[4];

  return (
    <section className="w-full sh py-4 bg-white">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold"
            style={{ color: color.primary }}
          >{title}</h2>

          <Link
            href={viewMoreLink}
            className="text-blue-600 hover:text-blue-700 font-sm flex items-center gap-1 transition"
          >
            View more
            <span className="text-xl">›</span>
          </Link>
        </div>


        {/* Products Grid */}
        <div className={`grid ${gridClass} ${gap}`}>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <Link href={`/product/${product.id}`} className="w-full h-full block">
                {/* Product Image */}
                <div className="relative bg-gray-200 aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full ${product.badgeColor || "bg-red-600"
                        }`}
                    >
                      {product.badge}
                    </div>
                  )}


                  <div className="absolute bottom-2 left-2 right-2">

                    <CountdownTimer expiresAt="2026-01-05" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-sm  font-semibold text-gray-800 mb-2 hover:text-[var(--hover-text)]"
                    style={{ ['--hover-text' as any]: color.primary, }}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-700"
                      
                    >
                      ৳{product.price.toFixed(0)}
                    </span>
                    {product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ৳{product.price.toFixed(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    {product.discount && (
                      <span className="text-red-600 font-bold">
                        {product.discount}% OFF
                      </span>
                    )}
                    <span className="text-yellow-500">⭐ ⭐⭐ ⭐</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
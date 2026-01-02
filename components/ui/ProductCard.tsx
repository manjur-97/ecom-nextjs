"use client";
import { useState, useRef, useMemo } from "react";
import { Product } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToCart } from "../../features/cart/cartSlice";
import BuyModal from "./BuyModal";
import { Heart, ShoppingCart as CartIcon, ShoppingBag, Eye, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { color } from "./theme/Color";

type Props = {
  product: Product;
  accent?: string;
};


export default function ProductCard({ product, accent = "#ff4da6" }: Props) {
  const dispatch = useAppDispatch();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    // Create animated element
    const animatedEl = document.createElement("div");
    animatedEl.style.position = "fixed";
    animatedEl.style.left = rect.left + "px";
    animatedEl.style.top = rect.top + "px";
    animatedEl.style.width = "50px";
    animatedEl.style.height = "50px";
    animatedEl.style.backgroundColor = color.primary;
    animatedEl.style.borderRadius = "50%";
    animatedEl.style.display = "flex";
    animatedEl.style.alignItems = "center";
    animatedEl.style.justifyContent = "center";
    animatedEl.style.color = "white";
    animatedEl.style.fontSize = "24px";
    animatedEl.style.zIndex = "9999";
    animatedEl.style.pointerEvents = "none";
    animatedEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>`;

    document.body.appendChild(animatedEl);

    // Animate to navbar cart icon
    const cartIcon = document.querySelector("[data-cart-icon]") as HTMLElement;

    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      const startX = rect.left;
      const startY = rect.top;
      const endX = cartRect.left;
      const endY = cartRect.top;

      let progress = 0;
      const duration = 3000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);

        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeInOutCubic
        const x = startX + (endX - startX) * easeProgress;
        const y = startY + (endY - startY) * easeProgress;
        const scale = 1 - easeProgress * 0.6;

        animatedEl.style.left = x + "px";
        animatedEl.style.top = y + "px";
        animatedEl.style.transform = `scale(${scale})`;
        animatedEl.style.opacity = String(1 - progress * 0.3);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          animatedEl.remove();
        }
      };

      animate();
    }

    dispatch(addToCart({ ...product, quantity: 1 }));

    // Show toast with options
    toast.custom((t: any) => (
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-center justify-between gap-4 border border-gray-700">
        <span className="font-semibold">Item added to cart!</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Redirect to checkout
              window.location.href = "/cart";
              toast.dismiss(t.id);
            }}
            className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded font-semibold text-sm"
            style={{ background: color.primary, }}
          >
            Checkout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="border border-gray-600 px-3 py-1 rounded font-semibold text-sm hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    ));
  };

  const discount = product.offerPrice
    ? Math.round(
      ((product.price - product.offerPrice) / product.price) * 100
    )
    : 0;

  return (
    <>
      <div
        ref={cardRef}
        className="product-card shadow bg-gray-50 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"

      >
        {/* Image Container */}
        <div className="relative h-64  overflow-hidden">


          {/* Product Image */}
          <Link href={`/product/${product.id}`} className="w-full h-full block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover  drop-shadow-2xl group-hover:scale-110 transition-transform duration-300 rounded"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Discount Badge */}
          {discount > 0 && (
            <div
              className="absolute top-4 right-4  px-3 py-1 rounded-full font-bold text-sm shadow-sm"
              style={{ background: color.primary, color: color.primaryText }}
            >
              -{discount}%
            </div>
          )}

          {/* Wishlist Heart */}
          <button className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur transition"

            style={{ background: color.primary }}>
            <Heart size={16}
              style={{ color: color.secondary }}
            />
          </button>


          <div className="quick-actions flex items-center justify-center gap-3">
            {/* View Button */}

            <button
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur
               flex items-center justify-center
               shadow-md
               transition-all duration-300
               hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] hover:scale-110"

              style={{ ['--hover-bg' as any]: color.primary, ['--hover-text' as any]: color.primaryText, }}
            >
              <Link href={`/product/${product.id}`} >
                <Eye className="w-5 h-5" />
              </Link>
            </button>

            {/* Add to Cart Button */}
            <button
              className="h-10 px-5 rounded-full bg-primary text-white
               text-sm font-semibold
               flex items-center justify-center gap-2
               shadow-md
               hover:scale-105 hover:shadow-lg"
              style={{ background: color.primary, color: color.primaryText }}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div
          className="p-5  flex flex-col justify-between "
          style={{ background: color.secondary, color: color.secondaryText, height: 'calc(100% - 16rem)' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-300 text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>
          {/* Title */}
          <h3 className="mb-1 line-clamp-3 font-semibold">

          </h3>
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
            <Link href={`/product/${product.id}`} className="hover:text-blue-500">{product.name}</Link>
          </h3>


          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold"
               style={{color:color.primary}}
              >
                ৳{product.offerPrice || product.price} 
              </span>

              {product.offerPrice && (
                <span className="text-sm text-gray-400 line-through"
               
                >
                  ৳{product.price}
                </span>
              )}
            </div>

            {discount > 0 && (
              <span className="discount-badge text-xs font-bold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Size Info */}
          {product.sizes && (
            <div className="mb-4 flex flex-wrap gap-2">
              {product.sizes.slice(0, 2).map((size) => (
                <span
                  key={size}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 2 && (
                <span className="text-xs text-gray-400">+{product.sizes.length - 2} more</span>
              )}
            </div>
          )}

          {/* Buttons */}
          {/* <div className="flex gap-1">
            <button
              onClick={() => setIsBuyModalOpen(true)}
              className="flex-1 py-2  shadow-md hover:shadow-xl transition"
              style={{
                background: color.buttonBg, color: color.buttonText
              }}
            >
              Buy
            </button>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-2  shadow-md hover:shadow-xl transition"
              style={{
                background: color.buttonBg, color: color.buttonText
              }}
            >
              Cart
            </button>
          </div> */}

        </div>
      </div>

      {/* Buy Modal */}
      <BuyModal
        product={product}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </>
  );
}


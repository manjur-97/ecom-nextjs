"use client";
import { useState, useRef, useMemo } from "react";
import { Product } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToCart } from "../../features/cart/cartSlice";
import BuyModal from "./BuyModal";
import { Heart, ShoppingCart as CartIcon } from "lucide-react";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cartCount = useAppSelector((state) => state.cart.items.length);


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
      const endX = cartRect.left ;
      const endY = cartRect.top ;

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
        className="rounded overflow-hidden shadow-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white-600 group"
      >
        {/* Image Container */}
        <div className="relative h-64  overflow-hidden">


          {/* Product Image */}
          <Link href={`/product/${product.id}`} className="w-full h-full block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-6 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

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
          <button className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur transition">
            <Heart size={16} />
          </button>
        </div>

        {/* Content Container */}
        <div
          className="p-5  flex flex-col justify-between "
          style={{ background: color.secondary, color: color.secondaryText, height: 'calc(100% - 16rem)' }}
        >
          {/* Title */}
          <h3 className="mb-1 line-clamp-3 font-semibold">
            <Link href={`/product/${product.id}`} className="hover:text-pink-600">{product.name}</Link>
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold"
              style={{ color: color.secondary }}
            >
              ${product.offerPrice || product.price}
            </span>
            {product.offerPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price}
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
          <div className="flex gap-1">
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
          </div>

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


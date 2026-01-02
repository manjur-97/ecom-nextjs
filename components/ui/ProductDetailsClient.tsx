"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Product } from "../../features/products/productsSlice";
import ProductCard from "./ProductCard";
import BuyModal from "./BuyModal";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { color } from "./theme/Color";

type Props = { id: string };

export default function ProductDetailsClient({ id }: Props) {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);

    const normalizedId = useMemo(() => decodeURIComponent(String(id)).trim(), [id]);

    const product = useMemo(() => {
        // Exact match
        let found = products.find((p) => String(p.id) === normalizedId);
        if (found) return found;

        // Numeric fallback
        const n = Number(normalizedId);
        if (!Number.isNaN(n)) {
            found = products.find((p) => Number(p.id) === n);
            if (found) return found;
        }

        // Loose match
        return products.find((p) => p.id && String(p.id).trim() === normalizedId);
    }, [products, normalizedId]);

    const [mainImage, setMainImage] = useState<string | undefined>(product?.image);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    if (!product) {
        return (
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-xl font-semibold">Product not found</h2>
            </div>
        );
    }

    useEffect(() => {
        if (product?.image) setMainImage(product.image);
    }, [product]);

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
            const duration = 1000;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                progress = Math.min(elapsed / duration, 1);

                const easeProgress = 1 - Math.pow(1 - progress, 3);
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

        dispatch(addToCart({ ...product, quantity: qty } as any));

        // Show toast with options
        toast.custom((t: any) => (
            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-center justify-between gap-4 border border-gray-700">
                <span className="font-semibold">Item added to cart!</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
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

    const related = products.filter((p) => p.id !== product.id).slice(0, 6);

    return (
        <div className="container mx-auto py-3 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="lg:col-span-6">
                    <div className="bg-white p-4 rounded">
                        <div className="flex gap-4">
                            <div className="w-20 flex flex-col gap-2">
                                {[product.image].map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className="border p-1 rounded bg-white"
                                    >
                                        <img src={img} className="w-16 h-16 object-contain" alt={product.name} />
                                    </button>
                                ))}
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <img src={mainImage} alt={product.name} className="max-h-96 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6">
                    <div className="bg-white p-6 rounded">
                        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                        <div className="mb-3 text-gray-600">SKU: {product.id}</div>

                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-3xl font-extrabold text-pink-600">৳{product.offerPrice || product.price}</span>
                            {product.offerPrice && <span className="text-sm text-gray-500 line-through">৳{product.price}</span>}
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Color:</span>
                                    <div className="flex items-center gap-2">
                                        <button className="w-5 h-5 rounded-full bg-black" />
                                        <button className="w-5 h-5 rounded-full bg-white border" />
                                        <button className="w-5 h-5 rounded-full bg-gray-400" />
                                    </div>
                                </div>

                                {product.sizes && (
                                    <div className="ml-6">
                                        <span className="text-sm font-medium mr-2">Size:</span>
                                        <div className="inline-flex gap-2">
                                            {product.sizes.map((s) => (
                                                <label key={s} className="border px-2 py-1 rounded text-sm">
                                                    <input type="radio" name="size" className="mr-1" />{s}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center border rounded">
                                <button className="px-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                                <div className="px-4">{qty}</div>
                                <button className="px-3" onClick={() => setQty((q) => q + 1)}>+</button>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={handleAddToCart} className="px-4 py-2 bg-black text-white rounded">Add to Cart</button>
                                <button onClick={() => setIsBuyModalOpen(true)} className="px-4 py-2 border rounded">Buy Now</button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex gap-4 border-b">
                                <button className={`py-2 ${activeTab === 'description' ? 'border-b-2 font-semibold' : 'text-gray-500'}`} onClick={() => setActiveTab('description')}>Description</button>
                                <button className={`py-2 ${activeTab === 'details' ? 'border-b-2 font-semibold' : 'text-gray-500'}`} onClick={() => setActiveTab('details')}>Details</button>
                                <button className={`py-2 ${activeTab === 'reviews' ? 'border-b-2 font-semibold' : 'text-gray-500'}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
                            </div>

                            <div className="pt-4 text-gray-700">
                                {activeTab === 'description' && <div>{product.description}</div>}
                                {activeTab === 'details' && (
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>High quality material</li>
                                        <li>Available in multiple sizes</li>
                                        <li>Free shipping on orders over ৳100</li>
                                    </ul>
                                )}
                                {activeTab === 'reviews' && (
                                    <div>No reviews yet.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mt-3 bg-white rounded p-4">
                <h3 className="text-xl font-semibold mb-4">Best Related Product</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {related.map((rp: Product) => (
                        <ProductCard key={rp.id + rp.name} product={rp} />
                    ))}
                </div>
            </section>

            {/* Buy Modal */}
            {product && (
                <BuyModal
                    product={product}
                    isOpen={isBuyModalOpen}
                    onClose={() => setIsBuyModalOpen(false)}
                />
            )}
        </div>
    );
}

"use client";
import { useSelector } from "react-redux";
import ProductCard from "../components/ui/ProductCard";
import { RootState } from "../redux/store";
import Category from "@/components/ui/Category";
import SliderFullScreenBanner from "@/components/ui/SliderFullScreenBanner";
import DynamicProductSection from "@/components/ui/DynamicProductSection";

export default function Home() {
  const products = useSelector((state: RootState) => state.products.items);
  return (
    <main className="container mx-auto py-3 px-2">
      <section>
        <Category />
      </section>
      <section>
        <SliderFullScreenBanner
          banners={[
            {
              id: "1",
              image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop",
              title: "Winter Flash Sale",
              description: "Up to 50% off on all products",
              link: "/sale",
              linkText: "Shop Now"
            },
            {
              id: "2",
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&h=500&fit=crop",
              title: "Watch For Every One",
              description: "Up to 10% off on all products",
              link: "/sale",
              linkText: "Shop Now"
            },
            {
              id: "3",
              image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&h=500&fit=crop",
              title: "Flash Sale For Man",
              description: "Buy 2 Get 1 Free",
              link: "/sale",
              linkText: "Shop Now"
            },


          ]}
          height="h-80"
          autoPlayInterval={3000}
        />
      </section>
      <div className="flex flex-col md:flex-row gap-3">
        <DynamicProductSection
          title="Campaign"
          columns={3}
          viewMoreLink="/campaigns"
          products={products}
        />

        <DynamicProductSection
          title="Pre Order"
          columns={3}
          products={products}
        />
      </div>

      <section className="w-full py-3 bg-white my-3">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Just For You</h2>

          </div>
          <hr className="mb-4" />


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}


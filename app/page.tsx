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
    <main className="container mx-auto py-6 px-2">
      <section>
        <Category />
      </section>
      <section>
        <SliderFullScreenBanner
          banners={[
            {
              id: "1",
              image: "/banner1.jpg",
              title: "Summer Sale",
              description: "Up to 50% off on all products",
              link: "/sale",
              linkText: "Shop Now"
            },
            {
              id: "1",
              image: "/banner1.jpg",
              title: "Summer Sale",
              description: "Up to 50% off on all products",
              link: "/sale",
              linkText: "Shop Now"
            },
            {
              id: "1",
              image: "/banner1.jpg",
              title: "Summer Sale",
              description: "Up to 50% off on all products",
              link: "/sale",
              linkText: "Shop Now"
            },


          ]}
          height="h-80"
          autoPlayInterval={3000}
        />
      </section>
      <DynamicProductSection
        title="Campaign"
        columns={4}
        viewMoreLink="/campaigns"
        products={products}
      />

      <DynamicProductSection
        title="Pre Order"
        columns={6}
        products={products}
      />
      <section className="w-full py-4 bg-white my-3">
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


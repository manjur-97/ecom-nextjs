"use client";
import { useSelector } from "react-redux";
import ProductCard from "../components/ui/ProductCard";
import { RootState } from "../redux/store";
import Category from "@/components/ui/Category";
import SliderFullScreenBanner from "@/components/ui/SliderFullScreenBanner";
import DynamicProductSection from "@/components/ui/DynamicProductSection";
import Ads from "@/components/ui/Ads";

export default function Home() {
  const products = useSelector((state: RootState) => state.products.items);
  return (
    <>
    <main className="container mx-auto py-3 px-2">
   
      <section>
        <Category />
      </section>
      <section className="my-3">
        <SliderFullScreenBanner
          banners={[
            {
              id: "1",
              image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop",
              title: "Winter Flash Sale",
              description: "Up to 50% off on all winter collections",
              link: "/listing/offer?offerCategory=Winter%20Flash%20Sale",
              linkText: "Shop Now"
            },
            {
              id: "2",
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&h=500&fit=crop",
              title: "Watch For Every One",
              description: "Up to 10% off on all watches",
              link: "/listing/offer?offerCategory=Watch For Every One",
              linkText: "Shop Now"
            },
            {
              id: "3",
              image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&h=500&fit=crop",
              title: "Flash Sale For Man",
              description: "Buy 2 Get 1 Free",
              link: "/listing/offer?offerCategory=Flash Sale For Man",
              linkText: "Shop Now"
            },


          ]}
          height="h-80"
          autoPlayInterval={3000}
        />
      </section>
      <div className="flex flex-col md:flex-row my-3 gap-3">
        <DynamicProductSection
          title="Campaign"
          columns={3}
          viewMoreLink="/listing/offer?offerCategory=Campaign"
          products={products.slice(0, 3)}
        />

        <DynamicProductSection
          title="Pre Order"
          columns={3}
          viewMoreLink="/listing/offer?offerCategory=Pre Order"
          products={products.slice(0, 3)}
        />
      </div>

      <div className="grid grid-cols-12 gap-3 items-start justify-center items-center">


        {/* Product Section → 9 columns */}
        <div className="col-span-12 md:col-span-9">
          <DynamicProductSection
            title="Flash Sale"
            columns={4}
            viewMoreLink="/listing/offer?offerCategory=Flash Sale"
            products={products.slice(0, 4)}
          />
        </div>
        {/* Ads → 3 columns */}
        <div className="col-span-12 md:col-span-3 flex h-full justify-center items-center">
          <Ads
            // width="300px"
            // height="300px"
            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&h=600&q=80"
            link="/listing/offer?offerCategory=Special Offers"
            badge="Ads"
          />
        </div>

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
    </>
  );
}


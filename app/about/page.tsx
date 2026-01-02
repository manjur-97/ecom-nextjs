"use client";
import { color } from "@/components/ui/theme/Color";

export default function AboutPage() {
  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            About Us
          </h1>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
        </div>

        <div className="bg-white rounded p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to our e-commerce platform! We are a leading online marketplace dedicated to providing 
              you with the best shopping experience. Since our inception, we have been committed to offering 
              high-quality products at competitive prices.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make shopping convenient, accessible, and enjoyable for everyone. We believe 
              in building lasting relationships with our customers through exceptional service and quality products.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg" style={{ background: color.secondary }}>
                <h3 className="font-semibold mb-2" style={{ color: color.primary }}>Quality First</h3>
                <p className="text-gray-600 text-sm">We ensure every product meets our high standards of quality.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: color.secondary }}>
                <h3 className="font-semibold mb-2" style={{ color: color.primary }}>Customer Satisfaction</h3>
                <p className="text-gray-600 text-sm">Your happiness is our top priority.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: color.secondary }}>
                <h3 className="font-semibold mb-2" style={{ color: color.primary }}>Innovation</h3>
                <p className="text-gray-600 text-sm">We continuously improve our platform and services.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: color.secondary }}>
                <h3 className="font-semibold mb-2" style={{ color: color.primary }}>Transparency</h3>
                <p className="text-gray-600 text-sm">Honest pricing and clear policies for all customers.</p>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: color.primary }}>✓</span>
                <span>Wide selection of products across multiple categories</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: color.primary }}>✓</span>
                <span>Fast and reliable shipping to your doorstep</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: color.primary }}>✓</span>
                <span>Secure payment options and buyer protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: color.primary }}>✓</span>
                <span>24/7 customer support ready to help you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: color.primary }}>✓</span>
                <span>Easy returns and refunds process</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}


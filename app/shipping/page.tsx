"use client";
import { color } from "@/components/ui/theme/Color";
import { Truck, Package, Clock, MapPin } from "lucide-react";

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      duration: "3-5 business days",
      price: "Free on orders over ৳500",
      icon: <Truck size={32} />,
    },
    {
      name: "Express Shipping",
      duration: "1-2 business days",
      price: "৳200",
      icon: <Package size={32} />,
    },
    {
      name: "Same Day Delivery",
      duration: "Same day (select areas)",
      price: "৳500",
      icon: <Clock size={32} />,
    },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Shipping Information
          </h1>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">Fast and reliable shipping to get your orders delivered on time.</p>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Options</h2>
          <div className="space-y-4">
            {shippingOptions.map((option, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div style={{ color: color.primary }}>{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {option.duration}
                      </span>
                      <span className="font-medium" style={{ color: color.primary }}>
                        {option.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Areas</h2>
            <p className="text-gray-600 mb-4">We currently ship to:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <MapPin size={16} style={{ color: color.primary }} />
                All major cities in Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} style={{ color: color.primary }} />
                Selected rural areas
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} style={{ color: color.primary }} />
                International shipping available
              </li>
            </ul>
          </div>

          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tracking Your Order</h2>
            <p className="text-gray-600 mb-4">Once your order ships, you'll receive:</p>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Shipping confirmation email with tracking number</li>
              <li>✓ Real-time tracking updates via SMS</li>
              <li>✓ Estimated delivery date</li>
              <li>✓ Delivery notifications</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping FAQs</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How long does shipping take?</h3>
              <p className="text-gray-600 text-sm">Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Delivery times may vary based on your location.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600 text-sm">Yes, we offer international shipping to select countries. Shipping costs and delivery times vary by destination.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">What if my package is damaged?</h3>
              <p className="text-gray-600 text-sm">If your package arrives damaged, please contact us within 48 hours with photos. We'll arrange a replacement or refund.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I change my shipping address?</h3>
              <p className="text-gray-600 text-sm">You can change your shipping address before your order ships. Once shipped, address changes may not be possible. Contact us immediately if needed.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


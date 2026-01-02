"use client";
import { color } from "@/components/ui/theme/Color";
import { RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  const returnSteps = [
    { step: 1, title: "Initiate Return", desc: "Log in to your account and select the item you want to return" },
    { step: 2, title: "Get Approval", desc: "We'll review your request and send return authorization within 24 hours" },
    { step: 3, title: "Pack & Ship", desc: "Pack the item in original packaging and ship it back using our return label" },
    { step: 4, title: "Get Refund", desc: "Once we receive and verify, refund will be processed within 5-7 business days" },
  ];

  const returnPolicy = [
    { icon: <Clock size={24} />, title: "30-Day Return Window", desc: "Items can be returned within 30 days of delivery" },
    { icon: <CheckCircle size={24} />, title: "Original Condition", desc: "Items must be unused, unwashed, and in original packaging" },
    { icon: <AlertCircle size={24} />, title: "Exceptions", desc: "Personalized items, perishables, and intimate apparel are non-returnable" },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Cancellation & Returns
          </h1>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">Easy returns and cancellations for your peace of mind.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white rounded p-8 mb-3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">How to Return</h2>
            <div className="space-y-6">
              {returnSteps.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: color.primary }}
                    >
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded p-8 mb-3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Return Policy</h2>
            <div className="space-y-4">
              {returnPolicy.map((policy, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: color.secondary }}>
                  <div style={{ color: color.primary }}>{policy.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{policy.title}</h3>
                    <p className="text-gray-600 text-sm">{policy.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Cancellation Policy</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Cancel anytime before shipment</li>
              <li>✓ Full refund for cancelled orders</li>
              <li>✓ Refund processed within 24 hours</li>
              <li>✓ No cancellation fees</li>
            </ul>
          </div>

          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Refund Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Refunds processed in 5-7 business days</li>
              <li>✓ Refunded to original payment method</li>
              <li>✓ Email confirmation sent upon processing</li>
              <li>✓ Contact us if refund doesn't appear</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Return FAQs</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">What items can I return?</h3>
              <p className="text-gray-600 text-sm">Most items can be returned within 30 days if unused and in original condition. Some items like personalized products, perishables, and intimate apparel cannot be returned.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Who pays for return shipping?</h3>
              <p className="text-gray-600 text-sm">For defective or wrong items, we cover return shipping. For other returns, shipping costs may apply. Free return labels are available for eligible orders.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How long does a refund take?</h3>
              <p className="text-gray-600 text-sm">Once we receive and verify your return, refunds are processed within 5-7 business days. The amount will be credited to your original payment method.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I exchange an item?</h3>
              <p className="text-gray-600 text-sm">Yes, you can request an exchange for a different size or color. Initiate a return and select "Exchange" as the reason. We'll process your exchange request.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


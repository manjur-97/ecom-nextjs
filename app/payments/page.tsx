"use client";
import { color } from "@/components/ui/theme/Color";
import { CreditCard, Shield, Lock, CheckCircle } from "lucide-react";

export default function PaymentsPage() {
  const paymentMethods = [
    { name: "Credit/Debit Cards", icon: "💳", desc: "Visa, Mastercard, American Express" },
    { name: "Digital Wallets", icon: "📱", desc: "PayPal, Apple Pay, Google Pay" },
    { name: "Bank Transfer", icon: "🏦", desc: "Direct bank transfer available" },
    { name: "Cash on Delivery", icon: "💵", desc: "Pay when you receive your order" },
  ];

  const securityFeatures = [
    { icon: <Shield size={24} />, title: "SSL Encryption", desc: "All transactions are encrypted with 256-bit SSL" },
    { icon: <Lock size={24} />, title: "Secure Payment Gateway", desc: "PCI DSS compliant payment processing" },
    { icon: <CheckCircle size={24} />, title: "Buyer Protection", desc: "Full refund if item doesn't arrive or is damaged" },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Payment Methods
          </h1>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">We offer multiple secure payment options for your convenience.</p>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Accepted Payment Methods</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {paymentMethods.map((method, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{method.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{method.name}</h3>
                <p className="text-gray-600 text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Security & Protection</h2>
          <div className="space-y-4">
            {securityFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: color.secondary }}>
                <div style={{ color: color.primary }}>{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment FAQs</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">When will I be charged?</h3>
              <p className="text-gray-600 text-sm">You'll be charged when your order is confirmed. For Cash on Delivery, payment is made upon delivery.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Is my payment information secure?</h3>
              <p className="text-gray-600 text-sm">Yes, we use industry-standard encryption and never store your full card details on our servers.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">What if my payment fails?</h3>
              <p className="text-gray-600 text-sm">If payment fails, please check your card details or try an alternative payment method. Your order won't be processed until payment is successful.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I get a refund?</h3>
              <p className="text-gray-600 text-sm">Yes, refunds are processed according to our return policy. Refunds typically take 5-7 business days to reflect in your account.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


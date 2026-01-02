"use client";
import { color } from "@/components/ui/theme/Color";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on 'Sign Up' in the top right corner, enter your email and password, and verify your email address. It only takes a minute!"
        },
        {
          q: "How do I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email and SMS. You can also track it in your account under 'My Orders'."
        },
        {
          q: "Can I modify my order after placing it?",
          a: "You can cancel your order before it ships. Once shipped, you can return it within 30 days following our return policy."
        },
      ]
    },
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "What are the shipping charges?",
          a: "We offer free shipping on orders over ৳500. Standard shipping costs ৳100 for orders below ৳500. Express shipping is available for ৳200."
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days. Same-day delivery is available in select areas."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to select international destinations. Shipping costs and delivery times vary by country. Check at checkout for availability."
        },
      ]
    },
    {
      category: "Payments",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept credit/debit cards, digital wallets (PayPal, Apple Pay, Google Pay), bank transfers, and Cash on Delivery."
        },
        {
          q: "Is it safe to pay online?",
          a: "Yes, all transactions are encrypted with 256-bit SSL encryption. We use PCI DSS compliant payment gateways and never store your full card details."
        },
        {
          q: "When will I be charged?",
          a: "You'll be charged when your order is confirmed. For Cash on Delivery, payment is made when you receive your order."
        },
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "You can return most items within 30 days of delivery if they're unused and in original condition. Some items like personalized products are non-returnable."
        },
        {
          q: "How do I return an item?",
          a: "Log in to your account, go to 'My Orders', select the item you want to return, and follow the return process. We'll provide a return label."
        },
        {
          q: "How long does a refund take?",
          a: "Once we receive and verify your return, refunds are processed within 5-7 business days to your original payment method."
        },
      ]
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3 text-center">
          <HelpCircle size={64} className="mx-auto mb-4" style={{ color: color.primary }} />
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Frequently Asked Questions
          </h1>
          <div className="w-20 h-1 mx-auto mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">Find answers to common questions about our services and policies.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((category, catIdx) => (
            <div key={catIdx} className="bg-white rounded p-6">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, qIdx) => {
                  const currentIndex = questionIndex++;
                  const isOpen = openIndex === currentIndex;
                  return (
                    <div
                      key={qIdx}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(currentIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 pr-4">{item.q}</span>
                        <ChevronDown
                          size={20}
                          className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: color.primary }}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 border-t border-gray-200" style={{ background: color.secondary }}>
                          <p className="text-gray-600 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded p-8 mt-3 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Still have questions?</h2>
          <p className="text-gray-600 mb-6">Can't find the answer you're looking for? Please contact our friendly support team.</p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg text-white font-semibold transition-colors"
            style={{ background: color.primary }}
            onMouseEnter={(e) => e.currentTarget.style.background = color.hoverBg}
            onMouseLeave={(e) => e.currentTarget.style.background = color.primary}
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}


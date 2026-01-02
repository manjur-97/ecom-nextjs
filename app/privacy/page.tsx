"use client";
import { color } from "@/components/ui/theme/Color";
import { Lock, Eye, Share2, Shield } from "lucide-react";

export default function PrivacyPage() {
  const privacyPoints = [
    {
      icon: <Eye size={24} />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes name, email, address, phone number, and payment information. We also collect usage data and cookies to improve your experience."
    },
    {
      icon: <Share2 size={24} />,
      title: "How We Use Your Information",
      content: "We use your information to process orders, communicate with you, improve our services, send promotional materials (with your consent), and comply with legal obligations. We never sell your personal information to third parties."
    },
    {
      icon: <Lock size={24} />,
      title: "Data Protection",
      content: "We implement industry-standard security measures to protect your personal information. This includes encryption, secure servers, and restricted access to your data. We regularly review and update our security practices."
    },
    {
      icon: <Shield size={24} />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time. You can opt-out of marketing communications, request a copy of your data, or request deletion of your account. Contact us to exercise these rights."
    },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className=" mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Privacy Policy
          </h1>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-500 text-sm mb-4">Last updated: January 2024</p>
          <p className="text-gray-600">
            We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <div className="space-y-6">
            {privacyPoints.map((point, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start gap-4 mb-3">
                  <div style={{ color: color.primary }}>{point.icon}</div>
                  <h2 className="text-xl font-semibold text-gray-800">{point.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed ml-10">{point.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Cookies</h2>
            <p className="text-gray-600 text-sm mb-4">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              You can control cookies through your browser settings.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Essential cookies for site functionality</li>
              <li>• Analytics cookies to understand usage</li>
              <li>• Marketing cookies (with your consent)</li>
            </ul>
          </div>

          <div className="bg-white rounded p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Third-Party Services</h2>
            <p className="text-gray-600 text-sm mb-4">
              We may use third-party services for payment processing, analytics, and marketing. 
              These services have their own privacy policies.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Payment processors (PCI compliant)</li>
              <li>• Analytics providers (anonymized data)</li>
              <li>• Shipping partners (order fulfillment)</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <div className="space-y-2 text-gray-600">
            <p><strong>Email:</strong> company@gmail.com</p>
            <p><strong>Phone:</strong> 01632480646</p>
            <p><strong>Address:</strong> Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India</p>
          </div>
        </div>
      </div>
    </main>
  );
}


"use client";
import { color } from "@/components/ui/theme/Color";
import { FileText, Shield, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on our website; remove any copyright or other proprietary notations from the materials."
    },
    {
      title: "User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password. We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion."
    },
    {
      title: "Product Information",
      content: "We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition."
    },
    {
      title: "Pricing and Payment",
      content: "All prices are listed in the currency specified and are subject to change without notice. We reserve the right to refuse or cancel any order placed for a product listed at an incorrect price. Payment must be received before we ship your order."
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage."
    },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <div className="flex items-center gap-4 mb-4">
            <FileText size={48} style={{ color: color.primary }} />
            <div>
              <h1 className="text-4xl font-bold" style={{ color: color.primary }}>
                Terms of Use
              </h1>
              <p className="text-gray-500 text-sm mt-1">Last updated: January 2024</p>
            </div>
          </div>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">
            Please read these terms carefully before using our website. By using our services, you agree to these terms.
          </p>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <div className="flex items-start gap-4 p-4 rounded-lg mb-6" style={{ background: color.secondary }}>
            <AlertTriangle size={24} style={{ color: color.primary }} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Important Notice</h3>
              <p className="text-gray-600 text-sm">
                These terms constitute a legally binding agreement. If you do not agree with any part of these terms, 
                you must not use our services.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {sections.map((section, idx) => (
              <section key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Shield size={20} style={{ color: color.primary }} />
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="bg-white rounded p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any significant changes 
            by posting the new terms on this page and updating the "Last updated" date. Your continued use of our 
            services after such modifications constitutes acceptance of the updated terms.
          </p>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about these Terms of Use, please contact us at{" "}
            <a href="mailto:company@gmail.com" className="underline" style={{ color: color.primary }}>
              company@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}


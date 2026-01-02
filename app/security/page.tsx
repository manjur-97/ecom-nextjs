"use client";
import { color } from "@/components/ui/theme/Color";
import { Shield, Lock, Eye, Key, CheckCircle } from "lucide-react";

export default function SecurityPage() {
  const securityMeasures = [
    {
      icon: <Lock size={32} />,
      title: "SSL Encryption",
      desc: "All data transmitted between your browser and our servers is encrypted using 256-bit SSL technology, ensuring your information remains private and secure."
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Payment Processing",
      desc: "We use PCI DSS compliant payment gateways. Your card details are never stored on our servers and are processed through secure third-party payment processors."
    },
    {
      icon: <Key size={32} />,
      title: "Account Protection",
      desc: "Your account is protected with strong password requirements and optional two-factor authentication. We monitor for suspicious activity and notify you of any changes."
    },
    {
      icon: <Eye size={32} />,
      title: "Privacy Controls",
      desc: "You have full control over your personal information. You can view, update, or delete your data at any time through your account settings."
    },
  ];

  const bestPractices = [
    "Use a strong, unique password for your account",
    "Never share your login credentials with anyone",
    "Log out when using shared or public computers",
    "Keep your device software and browser updated",
    "Be cautious of phishing emails - we'll never ask for your password via email",
    "Enable two-factor authentication for added security",
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3 text-center">
          <Shield size={64} className="mx-auto mb-4" style={{ color: color.primary }} />
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Security & Privacy
          </h1>
          <div className="w-20 h-1 mx-auto mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">
            Your security and privacy are our top priorities. Learn how we protect your information.
          </p>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Security Measures</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {securityMeasures.map((measure, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="mb-4" style={{ color: color.primary }}>
                  {measure.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{measure.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{measure.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white rounded p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">How We Protect Your Data</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: color.secondary }}>
                <CheckCircle size={24} style={{ color: color.primary }} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Data Encryption</h3>
                  <p className="text-gray-600 text-sm">All sensitive data is encrypted both in transit and at rest using industry-standard encryption methods.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: color.secondary }}>
                <CheckCircle size={24} style={{ color: color.primary }} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Regular Security Audits</h3>
                  <p className="text-gray-600 text-sm">We conduct regular security audits and penetration testing to identify and fix vulnerabilities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: color.secondary }}>
                <CheckCircle size={24} style={{ color: color.primary }} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Secure Infrastructure</h3>
                  <p className="text-gray-600 text-sm">Our servers are hosted on secure, monitored infrastructure with 24/7 security monitoring.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: color.secondary }}>
                <CheckCircle size={24} style={{ color: color.primary }} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Limited Data Access</h3>
                  <p className="text-gray-600 text-sm">Only authorized personnel have access to customer data, and all access is logged and monitored.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Security Best Practices for You</h2>
            <p className="text-gray-600 mb-4">Help us keep your account secure by following these practices:</p>
            <ul className="space-y-3">
              {bestPractices.map((practice, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} style={{ color: color.primary }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>


      </div>
    </main>
  );
}


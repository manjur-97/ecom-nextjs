"use client";
import { color } from "@/components/ui/theme/Color";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Contact Us
          </h1>
          <div className="w-20 h-1 mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600">We'd love to hear from you. Get in touch with us!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full" style={{ background: color.secondary }}>
                  <Phone size={24} style={{ color: color.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">01632480646</p>
                  <p className="text-gray-600 text-sm">Mon-Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full" style={{ background: color.secondary }}>
                  <Mail size={24} style={{ color: color.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">company@gmail.com</p>
                  <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full" style={{ background: color.secondary }}>
                  <MapPin size={24} style={{ color: color.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">
                    One Minute Bazar,<br />
                    1280/A, Mirpur-12,<br />
                    Dhaka, 1216, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full" style={{ background: color.secondary }}>
                  <Clock size={24} style={{ color: color.primary }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Business Hours</h3>
                  <p className="text-gray-600">Saturday to Thursday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Friday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded p-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  style={{ focusRingColor: color.primary }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  style={{ focusRingColor: color.primary }}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  style={{ focusRingColor: color.primary }}
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  style={{ focusRingColor: color.primary }}
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors"
                style={{ background: color.primary }}
                onMouseEnter={(e) => e.currentTarget.style.background = color.hoverBg}
                onMouseLeave={(e) => e.currentTarget.style.background = color.primary}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}


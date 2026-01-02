"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";

const cols = [
  {
    title: "ABOUT",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Stories", href: "/stories" },
    ],
  },
  
  {
    title: "HELP",
    links: [
      { name: "Payments", href: "/payments" },
      { name: "Shipping", href: "/shipping" },
      { name: "Cancellation & Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" }
    ],
  },
  {
    title: "CONSUMER POLICY",
    links: [
      { name: "Cancellation & Returns", href: "/returns" },
      { name: "Terms Of Use", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Privacy", href: "/privacy" }
    ],
  },
];



export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-semibold text-gray-100 mb-3">{c.title}</h4>
                <ul className="space-y-2 text-sm">
                  {c.links.map((l) => (
                    <li key={l.name}>
                      <Link 
                        href={l.href} 
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 space-y-6">
        
            <div>
              <h4 className="text-sm font-semibold text-gray-100 mb-2">Registered Office Address:</h4>
              <address className="not-italic text-sm text-gray-300 leading-relaxed">
                Flipkart Internet Private Limited,
                <br /> Buildings Alyssa, Begonia & Clove Embassy Tech Village,
                <br /> Outer Ring Road, Devarabeesanahalli Village,
                <br /> Bengaluru, 560103, Karnataka, India
              </address>
              <p className="text-sm text-gray-300 leading-relaxed">Mobile: 01632480646</p>
              <p className="text-sm text-gray-300 leading-relaxed">Email: company@gmail.com</p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-100">Social:</span>
              <div className="flex gap-1 mt-2">
                <a href="#" aria-label="facebook" className="gap-1 px-3 py-2 text-white font-medium bg-white/10 hover:bg-white/20 rounded transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="twitter" className="gap-1 px-3 py-2 text-white font-medium bg-white/10 hover:bg-white/20 rounded transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" aria-label="instagram" className="gap-1 px-3 py-2 text-white font-medium bg-white/10 hover:bg-white/20 rounded transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-2 pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-gray-300">
            <Link href="#" className="hover:text-white">Gift Cards</Link>
            <Link href="#" className="hover:text-white">Help Center</Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-400">© 2007-2025 Flipkart.com</div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}


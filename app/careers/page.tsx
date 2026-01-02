"use client";
import { color } from "@/components/ui/theme/Color";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";

export default function CareersPage() {
  const benefits = [
    { icon: "💰", title: "Competitive Salary", desc: "We offer market-competitive compensation packages" },
    { icon: "🏥", title: "Health Insurance", desc: "Comprehensive health coverage for you and your family" },
    { icon: "📚", title: "Learning & Development", desc: "Continuous learning opportunities and skill development" },
    { icon: "🏖️", title: "Work-Life Balance", desc: "Flexible working hours and paid time off" },
    { icon: "🎯", title: "Career Growth", desc: "Clear career progression paths and mentorship" },
    { icon: "🍕", title: "Team Events", desc: "Regular team building activities and celebrations" },
  ];

  const openPositions = [
    { title: "Senior Frontend Developer", department: "Engineering", location: "Remote", type: "Full-time" },
    { title: "Product Manager", department: "Product", location: "Hybrid/Remote", type: "Full-time" },
    { title: "UX Designer", department: "Design", location: "Remote", type: "Full-time" },
    { title: "Customer Support Specialist", department: "Support", location: "Hybrid/Remote", type: "Full-time" },
    { title: "Marketing Manager", department: "Marketing", location: "In House", type: "Full-time" },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className="mx-auto">
        <div className="bg-white rounded p-8 mb-3 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Join Our Team
          </h1>
          <div className="w-20 h-1 mx-auto mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're looking for talented individuals who are passionate about building the future of e-commerce.
            Join us in creating amazing experiences for millions of customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-3">
          <div className="bg-white rounded p-6 text-center">
            <Briefcase size={48} className="mx-auto mb-4" style={{ color: color.primary }} />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Diverse Roles</h3>
            <p className="text-gray-600">Opportunities across engineering, design, marketing, and more</p>
          </div>
          <div className="bg-white rounded p-6 text-center">
            <Users size={48} className="mx-auto mb-4" style={{ color: color.primary }} />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Great Culture</h3>
            <p className="text-gray-600">Collaborative environment with supportive teammates</p>
          </div>
          <div className="bg-white rounded p-6 text-center">
            <TrendingUp size={48} className="mx-auto mb-4" style={{ color: color.primary }} />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Growth Opportunities</h3>
            <p className="text-gray-600">Fast-paced growth with learning and development support</p>
          </div>
        </div>

        <div className="bg-white rounded p-8 mb-3">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-gray-200">
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <h3 className="font-semibold mb-1 text-gray-800">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {position.department}
                      </span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <button
                    className="px-6 py-2 rounded-lg text-white font-medium transition-colors whitespace-nowrap"
                    style={{ background: color.primary }}
                    onMouseEnter={(e) => e.currentTarget.style.background = color.hoverBg}
                    onMouseLeave={(e) => e.currentTarget.style.background = color.primary}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


"use client";
import { color } from "@/components/ui/theme/Color";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function StoriesPage() {
  const stories = [
    {
      title: "How We Started: A Journey of Passion",
      author: "CEO & Founder",
      date: "January 15, 2024",
      excerpt: "From a small idea to serving millions of customers, discover the story behind our company's founding and the vision that drives us forward.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
    },
    {
      title: "Customer Success Stories: Real Impact",
      author: "Customer Relations",
      date: "December 20, 2023",
      excerpt: "Read about how our platform has helped customers find exactly what they need, from everyday essentials to special occasion gifts.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
    },
    {
      title: "Innovation in E-commerce: Our Tech Journey",
      author: "CTO",
      date: "November 10, 2023",
      excerpt: "Learn about the cutting-edge technology we use to provide seamless shopping experiences and how we're shaping the future of online retail.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop"
    },
    {
      title: "Building a Sustainable Future",
      author: "Sustainability Team",
      date: "October 5, 2023",
      excerpt: "Our commitment to sustainability and how we're working towards reducing our environmental impact while serving our customers better.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop"
    },
  ];

  return (
    <main className="container mx-auto py-3 px-4">
      <div className=" mx-auto">
        <div className="bg-white rounded p-8 mb-3 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: color.primary }}>
            Our Stories
          </h1>
          <div className="w-20 h-1 mx-auto mb-6" style={{ background: color.primary }}></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the stories behind our company, our team, and the impact we're making in the world of e-commerce.
          </p>
        </div>

        <div className="space-y-3">
          {stories.map((story, idx) => (
            <article
              key={idx}
              className="bg-white rounded overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {story.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {story.author}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{story.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{story.excerpt}</p>
                  
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}


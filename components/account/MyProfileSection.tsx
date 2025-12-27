"use client";
import { useState } from "react";

export default function MyProfileSection() {
  const [formData, setFormData] = useState({
    firstName: "Manjur",
    lastName: "Rahman",
    email: "shuvo.eco15@gmail.com",
    phone: "+880 1632480646",
    dateOfBirth: "01-05-1996",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white rounded p-8 border border-gray-100 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded shadow hover:from-blue-600 hover:to-blue-700 transition-all font animate-bounce-once"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

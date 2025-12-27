"use client";
import { useState } from "react";

export default function ChangePasswordSection() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters!");
      return;
    }

    alert("Password changed successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setMessage("");
  };

  return (
    <div className="bg-white rounded p-8 max-w-md border border-gray-100 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded shadow hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function AddressSection() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      city: "Satkhira",
      state: "Kalaroa",
      zipCode: "1943",
      phone: "+880 1700-000000",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      street: "456 Office Lane",
      city: "Dhaka",
      state: "Dhaka",
      zipCode: "1230",
      phone: "+880 1700-000001",
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    type: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.street && newAddress.city) {
      setAddresses([
        ...addresses,
        { id: Date.now(), ...newAddress, isDefault: false },
      ]);
      setNewAddress({ type: "", street: "", city: "", state: "", zipCode: "", phone: "" });
      alert("Address added successfully!");
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="bg-white rounded p-8 border border-gray-100 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Addresses</h2>

      {/* Address List */}
      <div className="space-y-5 mb-10">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow hover:scale-[1.01] transition-all duration-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">{address.type}</span>
                  {address.isDefault && (
                    <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full shadow-sm">Default</span>
                  )}
                </div>
                <p className="text-gray-700">{address.street}</p>
                <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600 text-sm">📱 {address.phone}</p>
              </div>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address */}
      <div className="border-t border-gray-100 pt-8 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h3>
        <form onSubmit={handleAddAddress} className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newAddress.type}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, type: e.target.value })
                }
                className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="">Select Type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
                className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
              className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                value={newAddress.zipCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipCode: e.target.value })
                }
                className="w-full border border-gray-200 rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded shadow hover:from-blue-400 hover:to-blue-600 transition-all "
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}

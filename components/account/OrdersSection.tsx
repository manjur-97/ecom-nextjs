"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Eye } from "lucide-react";

export default function OrdersSection() {
    const orders = useSelector((state: RootState) => state.orders.orders);
    return (
        <div className="bg-white rounded p-8 border border-gray-100 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Order ID</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Delivery</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-gray-500">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order) => {
                                // Show first product info for summary row
                                const firstItem = order.items[0];
                                return (
                                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="py-4 px-4">
                                            {order.id}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">

                                                <span className="text-sm text-gray-700">{firstItem?.name || "Product"}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ""}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : order.status === "Shipped"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${order.payment === "Paid"
                                                    ? "border-green-500 text-green-600"
                                                    : "border-red-500 text-red-600"
                                                    }`}
                                            >
                                                {order.payment}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">৳ {order.total}</td>
                                        <td className="py-4 px-4">
                                            <Link href={`/account/orders/${order.id}`}>
                                                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-2 rounded-full text-sm shadow hover:from-blue-600 hover:to-blue-700 transition-all font-semibold cursor-pointer inline-block">
                                                    <Eye className="w-5 h-5" />
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import UserSidebar from "@/components/account/UserSidebar";

export default function NotificationPage() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <main className="container mx-auto py-3 px-2">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-1">
          <UserSidebar activeTab="/account/notification" />
        </div>

        <div className="md:col-span-3 bg-white rounded p-8 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
          <div className="space-y-5">
            <div className="border border-gray-200 rounded p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow hover:scale-[1.01] transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Order Confirmed</h3>
                  <p className="text-sm text-gray-600">Your order #12345 has been confirmed</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 animate-pulse"></span>
              </div>
            </div>
            <div className="border border-gray-200 rounded p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow hover:scale-[1.01] transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Order Shipped</h3>
                  <p className="text-sm text-gray-600">Your order #12344 has been shipped</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                <span className="w-2 h-2 bg-gray-300 rounded-full mt-1"></span>
              </div>
            </div>
            <div className="border border-gray-200 rounded p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow hover:scale-[1.01] transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">New Offer</h3>
                  <p className="text-sm text-gray-600">Special discount on electronics - 20% off</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
                <span className="w-2 h-2 bg-gray-300 rounded-full mt-1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

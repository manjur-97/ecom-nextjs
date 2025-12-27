"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import UserSidebar from "@/components/account/UserSidebar";
import OrdersSection from "@/components/account/OrdersSection";

export default function OrdersPage() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <main className="container mx-auto py-6 px-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <UserSidebar activeTab="/account/orders" />
        </div>

        <div className="md:col-span-3">
          <OrdersSection />
        </div>
      </div>
    </main>
  );
}

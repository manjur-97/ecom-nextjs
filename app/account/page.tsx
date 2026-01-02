"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import UserSidebar from "@/components/account/UserSidebar";
import MyProfileSection from "@/components/account/MyProfileSection";
import AddressSection from "@/components/account/AddressSection";

export default function AccountPage() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <main className="container mx-auto py-3 px-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <UserSidebar activeTab="/account" />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-3">
          <MyProfileSection />
          <AddressSection />
        </div>
      </div>
    </main>
  );
}

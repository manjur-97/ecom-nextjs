"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import UserSidebar from "@/components/account/UserSidebar";
import ChangePasswordSection from "@/components/account/ChangePasswordSection";

export default function PasswordPage() {
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
          <UserSidebar activeTab="/account/password" />
        </div>

        <div className="md:col-span-3">
          <ChangePasswordSection />
        </div>
      </div>
    </main>
  );
}

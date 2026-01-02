"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/user/userSlice";
import { RootState } from "@/redux/store";

interface UserSidebarProps {
  activeTab: string;
}

export default function UserSidebar({ activeTab }: UserSidebarProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSignOut = () => {
    localStorage.removeItem("userAuth");
    dispatch(logout());

    router.push("/login");
  };

  const menuItems = [
    { label: "My Profile", path: "/account", icon: "👤" },
    { label: "Notification", path: "/account/notification", icon: "🔔" },
    { label: "Order Status", path: "/account/orders", icon: "📦" },
    { label: "Change Password", path: "/account/password", icon: "🔐" },
    { label: "Policy", path: "/account/policy", icon: "📄" },
  ];

  return (
    <div className="bg-white rounded p-6 h-fit">
      {/* User Profile Card */}
      <div className="text-center mb-6 pb-6 border-b">
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 overflow-hidden flex items-center justify-center text-3xl">
            👤
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{user.username || "Guest User"}</h3>
        <p className="text-sm text-gray-500">xyz100@gmail.com</p>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-3 rounded text-left transition ${
              activeTab === item.path
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Sign Out */}
      <button
        onClick={handleSignOut}
        className="w-full mt-6 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded transition"
      >
        🚪 Sign Out
      </button>
    </div>
  );
}

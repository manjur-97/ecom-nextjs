"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import UserSidebar from "@/components/account/UserSidebar";

export default function PolicyPage() {
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
                    <UserSidebar activeTab="/account/policy" />
                </div>

                <div className="md:col-span-3 bg-white rounded p-8 border border-gray-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Policies</h2>
                    <div className="space-y-8 text-gray-700">
                        <section className="bg-gradient-to-br from-white to-gray-50 rounded p-6 border border-gray-100  animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Return Policy</h3>
                            <p>Items can be returned within 30 days of purchase if they are unused and in original condition. Please contact our customer service for return authorization.</p>
                        </section>
                        <section className="bg-gradient-to-br from-white to-gray-50 rounded p-6 border border-gray-100 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Policy</h3>
                            <p>We offer free shipping on orders over ৳500. Standard delivery takes 3-5 business days. Express shipping is available at checkout for faster delivery.</p>
                        </section>
                        <section className="bg-gradient-to-br from-white to-gray-50 rounded p-6 border border-gray-100 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Policy</h3>
                            <p>We are committed to protecting your privacy. Your personal information is used only for processing orders and improving our services. We never share your data with third parties without your consent.</p>
                        </section>
                        <section className="bg-gradient-to-br from-white to-gray-50 rounded p-6 border border-gray-100 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
                            <p>By using our platform, you agree to our terms and conditions. We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of changes.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

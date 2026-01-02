"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { addOrder } from "../../features/orders/ordersSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, Wallet, Smartphone, CreditCard, User, Mail, Phone, MapPin, FileText, Home, Calendar } from "lucide-react";
import { color } from "@/components/ui/theme/Color";


export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [quickCheckoutItem, setQuickCheckoutItem] = useState<any>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    division: "",
    district: "",
    thana: "",
    address: "",
    payment: "cash", // default payment option
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    // Check both Redux state and localStorage for authentication
    const userAuth = localStorage.getItem("userAuth");
    const isUserAuthenticated = isAuthenticated || !!userAuth;

    if (!isUserAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const quickData = sessionStorage.getItem("quickCheckout");
    if (quickData) {
      setQuickCheckoutItem(JSON.parse(quickData));
      sessionStorage.removeItem("quickCheckout");
    }
  }, []);

  // Show nothing while checking authentication or if not authenticated
  const userAuth = localStorage.getItem("userAuth");
  const isUserAuthenticated = isAuthenticated || !!userAuth;

  if (!isUserAuthenticated) {
    return null;
  }

  const items = quickCheckoutItem ? [quickCheckoutItem] : cartItems;
  const total = items.reduce(
    (sum, item) => sum + (item.offerPrice || item.price) * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    // Build order object
    const order = {
      id: Date.now().toString(),
      items: items,
      customer: { ...form },
      total: total,
      status: 'Pending',
      payment: form.payment === 'cash' ? 'Unpaid' : 'Paid',
      date: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    // Clear cart after order is placed
    // dispatch(clearCart());
    setOrderPlaced(true);
    setTimeout(() => {
      setShowInvoice(true);
    }, 1500);
  };

  const handleDownloadInvoice = () => {
    alert("Invoice download coming soon!");
  };

  if (orderPlaced && !showInvoice) {
    return (
      <main className="min-h-screen  flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-green-900 mb-2">Order Placed!</h1>
          <p className="text-green-700 mb-8">Your order has been confirmed. Redirecting to invoice...</p>
        </div>
      </main>
    );
  }

  if (showInvoice) {
    const orderId = Date.now().toString();
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <main className="min-h-screen flex items-center justify-center p-4" style={{ background: color.secondary }}>
        <div className="max-w-5xl w-full bg-white rounded shadow overflow-hidden animate-fade-in">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">

            <h2 className="text-3xl font-bold text-center mb-2">Order Confirmed!</h2>
            <p className="text-center text-green-50">Thank you for your purchase</p>
          </div>

          {/* Invoice Content */}
          <div className="p-8">
            {/* Invoice Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={24} style={{ color: color.primary }} />
                  <h3 className="text-2xl font-bold text-gray-800">Invoice</h3>
                </div>
                <p className="text-sm text-gray-500">Order ID: #{orderId.slice(-8)}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">{orderDate}</span>
                </div>
                <p className="text-xs text-gray-500">Order Date</p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} style={{ color: color.primary }} />
                Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 " style={{ background: color.secondary }}>
                <div className="p-4 rounded-lg">
                  <div className="flex items-center gap-2 ">
                    <User size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Full Name: {form.name}</span>
                  </div>

                </div>
                <div className="p-4 rounded-lg">
                  <div className="flex items-center gap-2 ">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Email: {form.email}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg">
                  <div className="flex items-center gap-2 ">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Mobile:{form.mobile}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg">
                  <div className="flex items-center gap-2 ">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">Payment Method: {form.payment === "cash" ? "Cash on Delivery" : form.payment === "bkash" ? "bKash" : "Nagad"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={20} style={{ color: color.primary }} />
                Delivery Address
              </h4>
              <div className="p-4 rounded-lg" style={{ background: color.secondary }}>
                <p className="text-gray-800 mb-1"><span className="font-semibold">{form.division}</span>, {form.district}</p>
                <p className="text-gray-800 mb-1">Thana: {form.thana}</p>
                <p className="text-gray-800">{form.address}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h4>
              <div className="space-y-3">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">
                      ৳{((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t-2 border-gray-200 pt-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>৳0.00</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold" style={{ color: color.primary }}>
                    ৳{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadInvoice}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg"
                style={{ background: color.primary, color: color.primaryText }}
                onMouseEnter={(e) => e.currentTarget.style.background = color.hoverBg}
                onMouseLeave={(e) => e.currentTarget.style.background = color.primary}
              >
                <Download size={20} />
                Download Invoice
              </button>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 border-2"
                style={{
                  borderColor: color.primary,
                  color: color.primary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color.primary;
                  e.currentTarget.style.color = color.primaryText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = color.primary;
                }}
              >
                <Home size={20} />
                Go to Home
              </Link>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-3 px-4 min-h-screen">
      <div className=" mx-auto bg-white px-4 rounded">
        <h1 className="text-3xl font-bold text-gray-800 p-4 ">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="rounded shadow p-8 mb-4"
              style={{ background: color.secondary }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Delivery Information</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                    <select
                      name="division"
                      value={form.division}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Division</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input
                      type="text"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="District"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thana</label>
                    <input
                      type="text"
                      name="thana"
                      value={form.thana}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Thana"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Full Address"
                  />
                </div>
                {/* Payment Option */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Cash on Delivery */}
                    <label
                      className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${form.payment === "cash"
                          ? "border-green-500 bg-green-50 shadow-lg"
                          : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={form.payment === "cash"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${form.payment === "cash"
                            ? "bg-green-500"
                            : "bg-gray-100"
                          }`}
                      >
                        <Wallet
                          size={32}
                          className={form.payment === "cash" ? "text-white" : "text-gray-600"}
                        />
                      </div>
                      <span className={`font-semibold text-center ${form.payment === "cash" ? "text-green-700" : "text-gray-700"
                        }`}>
                        Cash on Delivery
                      </span>
                      {form.payment === "cash" && (
                        <CheckCircle
                          size={20}
                          className="absolute top-2 right-2 text-green-500"
                        />
                      )}
                    </label>

                    {/* bKash */}
                    <label
                      className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${form.payment === "bkash"
                          ? "border-pink-500 bg-pink-50 shadow-lg"
                          : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={form.payment === "bkash"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${form.payment === "bkash"
                            ? "bg-pink-500"
                            : "bg-gray-100"
                          }`}
                      >
                        <Smartphone
                          size={32}
                          className={form.payment === "bkash" ? "text-white" : "text-gray-600"}
                        />
                      </div>
                      <span className={`font-semibold text-center ${form.payment === "bkash" ? "text-pink-700" : "text-gray-700"
                        }`}>
                        bKash
                      </span>
                      {form.payment === "bkash" && (
                        <CheckCircle
                          size={20}
                          className="absolute top-2 right-2 text-pink-500"
                        />
                      )}
                    </label>

                    {/* Nagad */}
                    <label
                      className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${form.payment === "nagad"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="nagad"
                        checked={form.payment === "nagad"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${form.payment === "nagad"
                            ? "bg-blue-500"
                            : "bg-gray-100"
                          }`}
                      >
                        <Smartphone
                          size={32}
                          className={form.payment === "nagad" ? "text-white" : "text-gray-600"}
                        />
                      </div>
                      <span className={`font-semibold text-center ${form.payment === "nagad" ? "text-blue-700" : "text-gray-700"
                        }`}>
                        Nagad
                      </span>
                      {form.payment === "nagad" && (
                        <CheckCircle
                          size={20}
                          className="absolute top-2 right-2 text-blue-500"
                        />
                      )}
                    </label>
                  </div>
                </div>
                {/* Terms and Conditions */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    className="accent-blue-600"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">I accept the <span className="underline text-blue-600 cursor-pointer">terms and conditions</span></label>
                </div>
                <button
                  type="submit"
                  disabled={!acceptTerms}
                  className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition shadow-md mt-4 flex items-center justify-center gap-2 ${!acceptTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {form.payment === "bkash" || form.payment === "nagad" ? (
                    <>
                      <CreditCard size={20} />
                      Pay and Place Order
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className=" rounded shadow p-8 sticky top-20"
              style={{ background: color.secondary }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ৳{((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>৳0.00</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">৳{total.toFixed(2)}</span>
              </div>
              <Link
                href="/cart"
                className="block text-center border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

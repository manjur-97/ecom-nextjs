"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { addOrder } from "../../features/orders/ordersSlice";
import Link from "next/link";
import { CheckCircle, Download } from "lucide-react";


export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    const quickData = sessionStorage.getItem("quickCheckout");
    if (quickData) {
      setQuickCheckoutItem(JSON.parse(quickData));
      sessionStorage.removeItem("quickCheckout");
    }
  }, []);

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
    setOrderPlaced(true);
    setTimeout(() => {
      setShowInvoice(true);
    }, 1500);
  };

  const handleDownloadInvoice = () => {
    // Dummy invoice download
    const invoiceText = `Invoice\nName: ${form.name}\nEmail: ${form.email}\nMobile: ${form.mobile}\nDivision: ${form.division}\nDistrict: ${form.district}\nThana: ${form.thana}\nAddress: ${form.address}\nTotal: $${total.toFixed(2)}`;
    const blob = new Blob([invoiceText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    link.click();
  };

  if (orderPlaced && !showInvoice) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-green-900 mb-2">Order Placed!</h1>
          <p className="text-green-700 mb-8">Your order has been confirmed. Redirecting to invoice...</p>
        </div>
      </main>
    );
  }

  if (showInvoice) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Invoice</h2>
          <div className="text-left mb-6">
            <p><span className="font-semibold">Name:</span> {form.name}</p>
            <p><span className="font-semibold">Email:</span> {form.email}</p>
            <p><span className="font-semibold">Mobile:</span> {form.mobile}</p>
            <p><span className="font-semibold">Division:</span> {form.division}</p>
            <p><span className="font-semibold">District:</span> {form.district}</p>
            <p><span className="font-semibold">Thana:</span> {form.thana}</p>
            <p><span className="font-semibold">Address:</span> {form.address}</p>
            <hr className="my-4" />
            <p className="font-semibold">Order Total: <span className="text-green-700">${total.toFixed(2)}</span></p>
          </div>
          <button
            onClick={handleDownloadInvoice}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition mb-4"
          >
            <Download className="w-5 h-5" /> Download Invoice
          </button>
          <Link href="/" className="block text-blue-600 hover:underline font-semibold">Go to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded shadow p-8 mb-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={form.payment === "cash"}
                        onChange={handleChange}
                        className="accent-green-600"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={form.payment === "card"}
                        onChange={handleChange}
                        className="accent-blue-600"
                      />
                      <span>Card Payment</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={form.payment === "bkash"}
                        onChange={handleChange}
                        className="accent-pink-600"
                      />
                      <span>bKash/Nagad</span>
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
                  className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition shadow-md mt-4 ${!acceptTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded shadow p-8 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
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

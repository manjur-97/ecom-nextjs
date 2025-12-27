"use client";


import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Download, Printer } from "lucide-react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import UserSidebar from "@/components/account/UserSidebar";



export default function OrderDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
    const order = useSelector((state: RootState) => state.orders.orders.find((o) => o.id === id));
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (invoiceRef.current) {
            const printContents = invoiceRef.current.innerHTML;
            const printWindow = window.open('', '', 'height=700,width=900');
            if (printWindow) {
                printWindow.document.write('<html><head><title>Invoice</title>');
                printWindow.document.write('<style>body{font-family:sans-serif;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f3f4f6;} .text-right{text-align:right;} .text-center{text-align:center;} .font-bold{font-weight:bold;} .border-none{border:none;} .bg-blue{background:#1e293b;color:#fff;} .rounded{border-radius:8px;} .mb-2{margin-bottom:8px;} .mb-4{margin-bottom:16px;} .mt-4{margin-top:16px;} .p-4{padding:16px;} .p-8{padding:32px;} .shadow{box-shadow:0 2px 8px #0001;} .w-full{width:100%;}</style>');
                printWindow.document.write('</head><body >');
                printWindow.document.write(printContents);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => printWindow.print(), 500);
            }
        }
    };

    const handleDownloadPDF = () => {
        if (invoiceRef.current) {
            html2pdf().from(invoiceRef.current).set({
                margin: 0.5,
                filename: `invoice-${order?.id}.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            }).save();
        }
    };

    if (!order) {
        return <div className="p-8 text-center text-red-600">Order not found.</div>;
    }

    return (

        <main className="container mx-auto py-6 px-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <UserSidebar activeTab="/account/orders" />
                </div>
                <div className="md:col-span-3">
                    <div className="w-full mx-auto bg-white rounded p-8 border border-gray-100  animate-fade-in">
                        <button onClick={() => router.back()} className="mb-6 text-blue-600 hover:underline">&larr; Back to Orders</button>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
                            {/* <div className="flex gap-3">
                                <button onClick={handlePrint} title="Print Invoice" className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition">
                                    <Printer className="w-6 h-6 text-blue-700" />
                                </button>
                                <button onClick={handleDownloadPDF} title="Download PDF" className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition">
                                    <Download className="w-6 h-6 text-green-700" />
                                </button>
                            </div> */}
                        </div>
                        <div ref={invoiceRef} className="bg-white rounded shadow p-6" style={{ color: '#222', background: '#fff' }}>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <div className="font-bold text-lg mb-1">Hello Bangla</div>
                                    <div className="text-gray-600 text-sm">Invoice Number: {order.id}</div>
                                    <div className="text-gray-600 text-sm">Date: {new Date(order.date).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-700">Bill to:</div>
                                    <div className="text-gray-700 text-sm">{order.customer.name}</div>
                                    <div className="text-gray-700 text-sm">{order.customer.address}, {order.customer.thana}, {order.customer.district}, {order.customer.division}</div>
                                    <div className="text-gray-700 text-sm">{order.customer.mobile}</div>
                                </div>
                            </div>
                            <table className="w-full mb-4 border-t border-b">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-2 px-2 text-left font-semibold text-gray-700">Item</th>
                                        <th className="py-2 px-2 text-center font-semibold text-gray-700">Quantity</th>
                                        <th className="py-2 px-2 text-right font-semibold text-gray-700">Rate</th>
                                        <th className="py-2 px-2 text-right font-semibold text-gray-700">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, idx) => (
                                        <tr key={item.id || idx} className="border-b last:border-b-0">
                                            <td className="py-2 px-2 flex items-center gap-2">
                                                {/* Use a valid image or blank if not found to avoid html2pdf.js errors */}
                                                <img src={item.image && !item.image.includes('file.svg') ? item.image : "/no-image.png"} alt={item.name || "Product"} className="w-8 h-8 rounded" />
                                                <span>{item.name || "Product"}</span>
                                            </td>
                                            <td className="py-2 px-2 text-center">{item.quantity}</td>
                                            <td className="py-2 px-2 text-right">৳ {(item.offerPrice || item.price).toFixed(2)}</td>
                                            <td className="py-2 px-2 text-right font-semibold">৳ {((item.offerPrice || item.price) * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <div className="w-full sm:w-1/2">
                                    <div className="flex justify-between py-1">
                                        <span className="font-semibold text-gray-700">Subtotal:</span>
                                        <span className="font-semibold text-gray-900">৳ {order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-700">Discount:</span>
                                        <span>৳ 0.00</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-gray-700">Tax:</span>
                                        <span>৳ 0.00</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-t mt-2 pt-2">
                                        <span className="font-bold text-lg text-gray-900">Total:</span>
                                        <span className="font-bold text-lg text-blue-700">৳ {order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-xs text-gray-500">Thank you for your purchase!</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>


    );
}

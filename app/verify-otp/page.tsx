"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/features/user/userSlice";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");
  const name = searchParams.get("name");

  async function handleVerify() {
    if (!otp) {
      setError("OTP is required");
      return;
    }

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });

    const data = await res.json();

    if (!data.success) {
      setError("Invalid OTP");
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    dispatch(login(data.user));

    router.push("/");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border w-full p-3 rounded mb-3"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleVerify}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        Verify & Login
      </button>
    </div>
  );
}

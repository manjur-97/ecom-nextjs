"use client";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { color } from "@/components/ui/theme/Color";
import { User, Phone, LogIn, CheckCircle2, XCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    
    if (!mobileNumber.trim()) {
      setError("Mobile number is required.");
      return;
    }
    
    // Basic mobile number validation (Bangladesh format)
    const mobileRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    const cleanMobile = mobileNumber.replace(/\s+/g, '');
    
    if (!mobileRegex.test(cleanMobile)) {
      setError("Please enter a valid mobile number (e.g., 01XXXXXXXXX)");
      return;
    }
    
    // Store user data
    const userData = {
      name: name.trim(),
      mobileNumber: cleanMobile,
      username: name.trim().toLowerCase().replace(/\s+/g, '')
    };
    
    localStorage.setItem("userAuth", JSON.stringify(userData));
    dispatch(login(userData.username));
    setSuccess(true);
    
    // Redirect after 1 second
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  function handleSocialRegister(provider: string) {
    // Placeholder for social register functionality
    console.log(`Register with ${provider}`);
    // In a real app, you would integrate with OAuth providers here
    alert(`${provider} registration integration coming soon!`);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: color.secondary }}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: color.secondary }}>
              <CheckCircle2 size={48} style={{ color: color.primary }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome <span className="font-semibold" style={{ color: color.primary }}>{name}</span>! 
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4 py-8" style={{ background: color.secondary }}>
      <div className="w-full max-w-5xl grid md:grid-cols-1 gap-6 items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">Create Account</h1>
              <p className="text-gray-500 text-sm">Enter your details to create a new account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-200 animate-shake">
                <XCircle size={20} className="text-red-600 shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{
                      borderColor: error && !name ? "#EF4444" : "#D1D5DB"
                    }}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{
                      borderColor: error && !mobileNumber ? "#EF4444" : "#D1D5DB"
                    }}
                    placeholder="01XXXXXXXXX"
                    value={mobileNumber}
                    onChange={e => {
                      // Allow only numbers and + for international format
                      const value = e.target.value.replace(/[^\d+]/g, '');
                      setMobileNumber(value);
                    }}
                    autoComplete="tel"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter your 11-digit mobile number</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg text-white font-semibold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                style={{ background: color.primary }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#309A38'}
                onMouseLeave={(e) => e.currentTarget.style.background = color.primary}
              >
                <LogIn size={20} />
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Register Buttons */}
            <div className="space-y-3 mb-6">
              {/* Google Register */}
              <button
                type="button"
                onClick={() => handleSocialRegister("Google")}
                className="w-full py-3 px-4 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium transition-all transform hover:scale-105 hover:shadow-md flex items-center justify-center gap-3"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#309A38";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#D1D5DB";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Register with Google
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold transition-colors hover:underline"
                  style={{ color: color.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = color.hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.color = color.primary}
                >
                  Sign In
                </Link>
              </p>
            </div>
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        input:focus {
          --tw-ring-color: ${color.primary} !important;
        }
      `}</style>
    </div>
  );
}


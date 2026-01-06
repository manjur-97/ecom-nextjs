"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { login, logout } from "../../features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { color } from "@/components/ui/theme/Color";
import { User, Lock, LogIn, Eye, EyeOff, CheckCircle2, XCircle, Phone, Key } from "lucide-react";
import { AuthService } from "@/services/auth.service";

export default function LoginPage() {
  const [mobile_no, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("userAuth");
    return !!user;
  });
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!mobile_no) {
      setError("Mobile no is required.");
      return;
    }
    try {
      const res = await AuthService.sendLoginOtp({ 'mobile_no': mobile_no });


      if (res.data.success) {
        setStep(2);

      } else {
        setError(res.data.errors.message || "Failed to send OTP");
      }
    } catch (err: any) {
      // console.log(err)
      setError(err.response?.data?.errors?.message || "Something went wrong!");
    }


    // localStorage.setItem("userAuth", JSON.stringify({ username, password }));
    // dispatch(login(username));
    // setIsAuthenticated(true);
    // router.push("/");
  }
  async function handleLoginOptVerification(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("OTP is required.");
      return;
    }
    try {
      const res = await AuthService.verifyLoginOtp({ 'mobile_no': mobile_no, 'otp': otp });


      if (res.data.success) {

        router.push("/");
      } else {
        setError(res.data.errors.message || "Failed to send OTP");
      }
    } catch (err: any) {
      // console.log(err)
      setError(err.response?.data?.errors?.message || "Something went wrong!");
    }

    // localStorage.setItem("userAuth", JSON.stringify({ username, password }));
    // dispatch(login(username));
    // setIsAuthenticated(true);
    // router.push("/");
  }

  function handleLogout() {
    localStorage.removeItem("userAuth");
    // dispatch(logout());
    setIsAuthenticated(false);
    setMobileNo("");
  }

  function handleSocialLogin(provider: string) {
    // Placeholder for social login functionality
    console.log(`Login with ${provider}`);
    // In a real app, you would integrate with OAuth providers here
    // For now, we'll just show an alert
    alert(`${provider} login integration coming soon!`);
  }

  if (isAuthenticated) {
    const user = JSON.parse(localStorage.getItem("userAuth") || "{}");
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: color.secondary }}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: color.secondary }}>
              <CheckCircle2 size={48} style={{ color: color.primary }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">
            You are logged in as <span className="font-semibold" style={{ color: color.primary }}>{user.username}</span>
          </p>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all transform hover:scale-105 hover:shadow-lg"
            style={{ background: "#EF4444" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#DC2626"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#EF4444"}
          >
            Logout
          </button>
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

              <h1 className="text-3xl font-bold mb-2 text-gray-800">Sign In</h1>
              <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-200 animate-shake">
                <XCircle size={20} className="text-red-600 shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile No
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{
                        borderColor: error && !mobile_no ? "#EF4444" : "#D1D5DB"
                      }}
                      placeholder="Enter your mobile no (01XXXXXXXXX)"
                      value={mobile_no}
                      onChange={e => setMobileNo(e.target.value)}
                      autoComplete="mobile_no"
                    />
                  </div>
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
                  Send Otp
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginOptVerification} className="space-y-5">


                {/* Otp Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key size={20} className="text-gray-400" />
                    </div>
                    <input
                      type='text'
                      className="w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{
                        borderColor: error && !otp ? "#EF4444" : "#D1D5DB"
                      }}
                      placeholder="Enter your OTP "
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      autoComplete="otp"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password must be 1-8 characters</p>
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
                  Submit
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">

              {/* Google Login */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
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
                Continue with Google
              </button>


            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold transition-colors hover:underline"
                  style={{ color: color.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = color.hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.color = color.primary}
                >
                  Sign Up
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


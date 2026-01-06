import api from "./api";

export const AuthService = {
    sendRegisterOtp: (payload: { mobile_no: string; name?: string }) =>
        api.post("/send-register-otp", payload),

    verifyRegisterOtp: (payload: { mobile_no: string; otp: string }) =>
        api.post("/verify-register-otp", payload),

    sendLoginOtp: (payload: { mobile_no: string; }) =>
        api.post("/send-login-otp", payload),

    verifyLoginOtp: (payload: { mobile_no: string; otp: string  }) =>
        api.post("/verify-login-otp", payload),
};
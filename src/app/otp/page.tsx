"use client";
import AuthLayout from "@/components/AuthLayout";
import OTPInput from "@/components/OTPInput";

const OTPVerification = () => {
  const handleOTPSubmit = () => {
    alert("OTP Verification Logic");
  };
  return (
    <AuthLayout>
      <>
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-1">
            OTP Confirmation
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl">
            OTP is sent on your given whatsapp mobile number
          </p>
        </div>
        <form className="bg-transparent" onSubmit={handleOTPSubmit}>
          <OTPInput />
          <p className="relative text-end mt-3 mb-6 text-sm text-lime-400">
            <button onClick={() => alert("resend otp handler")}>
              Resend SMS
            </button>
          </p>
          <button className="w-full p-3 text-black font-bold text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]">
            {/* Verify OTP */}
            Continue
          </button>
        </form>
      </>
    </AuthLayout>
  );
};

export default OTPVerification;

"use client";
import AuthLayout from "@/components/AuthLayout";

const ForgotPassword = () => {
  const handleSubmit = () => {
    alert("Forgot Password Logic");
  };
  return (
    <AuthLayout>
      <>
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-1">
            Forgot Password?
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl">
            Enter Your Mobile Number
          </p>
        </div>

        <form className="bg-transparent" onSubmit={handleSubmit}>
          <div className="mb-4 rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
            />
          </div>
          <button className="w-full p-3 text-black font-bold text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]">
            Send an OTP
          </button>
        </form>
      </>
    </AuthLayout>
  );
};

export default ForgotPassword;

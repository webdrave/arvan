"use client";
import AuthLayout from "@/components/AuthLayout";

const newPassword = () => {
  const handleSubmit = () => {
    alert("Enter New Password Logic Here");
  };
  return (
    <AuthLayout>
      <>
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-4xl font-bold mb-1">
            Enter a New Password
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl">
            Password Must Contain Atleast 8 Letters
          </p>
        </div>

        <form className="bg-transparent" onSubmit={handleSubmit}>
          <div className="mb-4 rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
            <input
              type="text"
              placeholder="New Password"
              className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
            />
          </div>
          <div className="mb-4 rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
            <input
              type="text"
              placeholder="Confirm Password"
              className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
            />
          </div>
          <button className="w-full p-3 text-black font-bold text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]">
            Continue
          </button>
        </form>
      </>
    </AuthLayout>
  );
};

export default newPassword;
